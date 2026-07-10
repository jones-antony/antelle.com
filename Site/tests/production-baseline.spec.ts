import { expect, test } from '@playwright/test';
import path from 'node:path';
import type { Page } from '@playwright/test';

const screenshotPath = (...parts: string[]) => path.resolve('..', 'docs', 'screenshots', ...parts);

async function openDropdown(page: Page, navId: 'Services' | 'Experience') {
  const trigger = page.locator(`#${navId}`);
  const menu = page.locator(`#${navId} + .dropdown-menu`);

  await trigger.hover();
  if (!(await menu.isVisible())) {
    await trigger.click();
  }

  await expect(menu).toBeVisible();
  return menu;
}

test('homepage keeps the production service and customer baseline', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Innovative solutions for business problems.' })).toBeVisible();
  await expect(page.locator('.homepage .backdrop')).toHaveCSS('background-image', /home-splash-background/);
  await expect(page.getByText('We provide quality software solutions to business problems')).toBeVisible();
  await expect(page.locator('main .services .service')).toHaveCount(7);
  await expect(page.locator('main .services')).toContainText('Low-Code Governance');
  await expect(page.getByRole('heading', { name: 'When to speak to Antelle' })).toBeVisible();
  await expect(page.locator('.when-to-speak .problem-card')).toHaveCount(6);
  await expect(page.getByRole('heading', { name: 'Have a system that is becoming difficult to support, report from or change?' })).toBeVisible();
  await expect(page.locator('img[alt="Ardan International"]')).toBeVisible();
  await expect(page.locator('img[alt="IFGL"]')).toBeVisible();
  await expect(page.locator('main')).not.toContainText('Member of MICTA');

  await page.screenshot({ path: screenshotPath('production-homepage.png'), fullPage: true });
});

test('navigation menus use the production service and experience structure', async ({ page }) => {
  await page.goto('/');

  const servicesMenu = await openDropdown(page, 'Services');
  await expect(servicesMenu.locator('.dropdown-option')).toHaveCount(7);
  await expect(servicesMenu).toContainText('Power Platform');
  await expect(servicesMenu).toContainText('Low-Code Governance');
  await servicesMenu.screenshot({ path: screenshotPath('production-services-menu.png') });

  const experienceMenu = await openDropdown(page, 'Experience');
  await expect(experienceMenu.locator('.dropdown-option')).toHaveCount(3);
  await experienceMenu.screenshot({ path: screenshotPath('production-experience-menu.png') });
});

test('retired local routes stay absent from the production baseline', async ({ request }) => {
  for (const pathName of ['/about/members-of-micta/']) {
    const response = await request.get(pathName);
    expect(response.status(), pathName).toBe(404);
  }
});

test('low-code governance service page is available', async ({ page, request }) => {
  const response = await request.get('/services/low-code-business-critical/');
  expect(response.status()).toBe(200);

  await page.goto('/services/low-code-business-critical/');
  await expect(page.getByRole('heading', { name: 'When low-code becomes business-critical' })).toBeVisible();
  await expect(page.locator('main a[href="/services/power-platform/"]').first()).toBeVisible();
  await expect(page.locator('main a[href="/services/microsoft-dynamics-crm/"]').first()).toBeVisible();

  await page.screenshot({ path: screenshotPath('low-code-governance-page.png'), fullPage: true });
});

test('key service pages include page-specific conversation prompts', async ({ page }) => {
  const servicePrompts = [
    ['/services/power-platform/', 'Has a Power Platform solution grown beyond its original scope?', 'Discuss a Power Platform requirement'],
    ['/services/microsoft-dynamics-crm/', 'Have a CRM estate that is becoming difficult to change, support or report from?', 'Discuss a CRM requirement'],
    ['/services/business-intelligence/', 'Not confident your reporting is based on trusted data?', 'Discuss a BI requirement'],
    ['/services/consultancy/', 'Need experienced technical input before committing to a project?', 'Discuss a consultancy requirement'],
    ['/services/software-development/', 'Need a system that fits the way the business actually works?', 'Discuss a software requirement'],
    ['/services/web-development/', 'Need a secure, maintainable web application or portal?', 'Discuss a web development requirement'],
    ['/services/low-code-business-critical/', 'Has a low-code solution become too important to leave informal?', 'Discuss a Power Platform or Dataverse requirement']
  ] as const;

  for (const [pathName, heading, linkName] of servicePrompts) {
    await page.goto(pathName);
    const cta = page.locator('.conversation-cta');
    await expect(cta.getByRole('heading', { name: heading })).toBeVisible();
    await expect(cta.getByRole('link', { name: linkName })).toHaveAttribute('href', '/contact/');
  }
});
