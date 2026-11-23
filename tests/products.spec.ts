
import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Verify user can add product to cart', async ({page}) => {

    

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify Products page
    const productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).toHaveText('Products');

    // Add product to cart
    await productsPage.addProductToCart();

    // Verify cart count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.waitForTimeout(5000);
});
