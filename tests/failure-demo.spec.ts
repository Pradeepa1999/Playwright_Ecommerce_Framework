
import { test, expect } from '@playwright/test';

test('Demo - Capture screenshot and video on failure', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Wrong Title');
});

