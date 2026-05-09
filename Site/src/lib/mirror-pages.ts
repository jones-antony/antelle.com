import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

const mirrorRoot = join(process.cwd(), '..', 'Mirror', 'www.antelle.com');

export interface MirrorPage {
  slug: string;
  title: string;
  description?: string;
  pageClass: string;
  content: string;
}

const ignoredDirectories = new Set(['blog']);
const overriddenSlugs = new Set([
  'about',
  'about/members-of-micta',
  'about/site-map',
  'careers',
  'experience/completed-projects',
  'experience/core-skills',
  'experience/past-experience',
  'iso-27001',
  'privacy-policy',
  'services/ai-agentic-services',
  'services/business-intelligence',
  'services/consultancy',
  'services/microsoft-dynamics-crm',
  'services/power-platform',
  'services/software-development',
  'services/web-development'
]);

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return ignoredDirectories.has(entry) ? [] : walk(fullPath);
    }

    return entry === 'index.html' ? [fullPath] : [];
  });
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ');
}

function extractMeta(html: string, name: string): string | undefined {
  const pattern = new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`, 'i');
  return html.match(pattern)?.[1] ? decodeEntities(html.match(pattern)![1].trim()) : undefined;
}

function normaliseRoute(filePath: string): string {
  const relativePath = relative(mirrorRoot, dirname(filePath)).split(sep).join('/');
  return relativePath === '' ? '' : relativePath;
}

function cleanPageClass(html: string): string {
  const classMatch = html.match(/<body>\s*<div class="([\s\S]*?)">/i);
  return (classMatch?.[1] ?? '')
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');
}

function extractContent(html: string, slug: string): string {
  const contentMatch = html.match(
    /<main class="content">\s*<div class="container">\s*([\s\S]*?)\s*<\/div>\s*<\/main>/i
  );

  if (!contentMatch) {
    throw new Error(`Could not extract mirror page content for ${slug}.`);
  }

  return contentMatch[1].trim();
}

function resolveInternalUrl(value: string, currentSlug: string): string {
  if (
    value.startsWith('#') ||
    value.startsWith('http:') ||
    value.startsWith('https:') ||
    value.startsWith('mailto:') ||
    value.startsWith('skype:') ||
    value.startsWith('tel:') ||
    value.startsWith('javascript:')
  ) {
    return value;
  }

  const currentPath = currentSlug ? `/${currentSlug}/` : '/';
  const resolved = new URL(value, `https://antelle.local${currentPath}`);
  let pathname = resolved.pathname.replace(/\/index\.html$/i, '/');

  if (pathname.startsWith('/media/')) {
    pathname = `/assets/images/legacy-mirror${pathname.slice('/media'.length)}`;
  } else if (pathname.startsWith('/svg/') || pathname.startsWith('/fonts/')) {
    pathname = `/assets${pathname}`;
  }

  return `${pathname}${resolved.search}${resolved.hash}`;
}

function normaliseContent(html: string, currentSlug: string): string {
  const withoutParkedBlog =
    currentSlug === 'about/site-map'
      ? html.replace(
          /\s*<li>\s*<a href="\.\.\/\.\.\/blog\/index\.html">Blog<\/a>[\s\S]*?(?=<li>\s*<a href="\.\.\/\.\.\/privacy-policy\/index\.html">)/,
          ''
        )
      : html;

  return withoutParkedBlog
    .replace(/\u00c2\u00a0/g, '&nbsp;')
    .replace(/\u00c2/g, '')
    .replace(/\s(data-toggle|data-target)=["'][^"']*["']/g, '')
    .replace(/\s(onclick)=["'][^"']*["']/g, '')
    .replace(/\s(href|src)=["']([^"']+)["']/g, (_match, attribute: string, value: string) => {
      return ` ${attribute}="${resolveInternalUrl(value, currentSlug)}"`;
    });
}

export function getMirrorPageSlugs(): string[] {
  if (!existsSync(mirrorRoot)) {
    throw new Error(`Mirror root not found: ${mirrorRoot}`);
  }

  return walk(mirrorRoot)
    .map(normaliseRoute)
    .filter((slug) => slug !== '')
    .filter((slug) => !overriddenSlugs.has(slug))
    .sort();
}

export function getMirrorPage(slug: string): MirrorPage {
  const filePath = join(mirrorRoot, ...slug.split('/'), 'index.html');
  const html = readFileSync(filePath, 'utf8');
  const title = decodeEntities(html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() ?? 'Antelle IT Ltd');

  return {
    slug,
    title,
    description: extractMeta(html, 'description'),
    pageClass: cleanPageClass(html),
    content: normaliseContent(extractContent(html, slug), slug)
  };
}
