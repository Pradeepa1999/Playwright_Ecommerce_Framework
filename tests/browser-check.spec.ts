import { test, expect } from '@playwright/test';

test('Verify Chromium browser launch', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await expect(page.getByPlaceholder('Username'))
        .toBeVisible();

});