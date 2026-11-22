import {test,expect, chromium, type Browser, type Page} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('Verify product is available in shopping cart', async () => {
    const browser:Browser=await chromium.launch({headless :false,channel:'chrome'});
    const page:Page=await browser.newPage();

    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 2: Add product to cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart();

    // Step 3: Open cart
    await productsPage.openCart();

    // Step 4: Verify cart
    const cartPage = new CartPage(page);

    await expect(cartPage.cartTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItems).toContainText('Sauce Labs Backpack');

    // Step 5: Verify Checkout button
    await expect(cartPage.checkoutButton).toBeVisible();

    await page.waitForTimeout(5000);
});
