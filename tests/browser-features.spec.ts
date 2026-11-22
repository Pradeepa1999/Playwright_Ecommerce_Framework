
import { test, expect } from '@playwright/test';

test('Verify screenshot functionality', async ({ page }) => {

    // Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Verify login page
    await expect(
        page.getByPlaceholder('Username')
    ).toBeVisible();

    // Take screenshot
    await page.screenshot({
        path: 'screenshots/login-page.png',
        fullPage: true
    });
});
