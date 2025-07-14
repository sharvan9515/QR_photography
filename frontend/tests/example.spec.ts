import { test, expect } from '@playwright/test';

test('homepage has login links', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('Admin Login')).toBeVisible();
});
