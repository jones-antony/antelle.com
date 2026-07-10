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
  await expect(page.locator('main .services .service')).toHaveCount(6);
  await expect(page.locator('main .services')).not.toContainText('Low-Code Governance');
  await expect(page.locator('img[alt="Ardan International"]')).toBeVisible();
  await expect(page.locator('img[alt="IFGL"]')).toBeVisible();
  await expect(page.locator('main')).not.toContainText('Member of MICTA');

  await page.screenshot({ path: screenshotPath('production-homepage.png'), fullPage: true });
});

test('navigation menus use the production service and experience structure', async ({ page }) => {
  await page.goto('/');

  const servicesMenu = await openDropdown(page, 'Services');
  await expect(servicesMenu.locator('.dropdown-option')).toHaveCount(6);
  await expect(servicesMenu).toContainText('Power Platform');
  await expect(servicesMenu).not.toContainText('Low-Code Governance');
  await servicesMenu.screenshot({ path: screenshotPath('production-services-menu.png') });

  const experienceMenu = await openDropdown(page, 'Experience');
  await expect(experienceMenu.locator('.dropdown-option')).toHaveCount(3);
  await experienceMenu.screenshot({ path: screenshotPath('production-experience-menu.png') });
});

test('retired local routes stay absent from the production baseline', async ({ request }) => {
  for (const pathName of ['/about/members-of-micta/', '/services/low-code-business-critical/']) {
    const response = await request.get(pathName);
    expect(response.status(), pathName).toBe(404);
  }
});
