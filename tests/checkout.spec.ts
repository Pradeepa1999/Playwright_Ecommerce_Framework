
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Verify complete checkout process', async ({ page }) => {

    // 1. Login
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Add product to cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart();
    await productsPage.openCart();

    // 3. Verify cart and checkout
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.checkout();

    // 4. Enter customer details
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.enterCustomerDetails(
        'Pradeep',
        'Kumar',
        '500001'
    );

    // 5. Verify checkout overview
    await expect(page.locator('.title'))
        .toHaveText('Checkout: Overview');

    // 6. Finish checkout
    await checkoutPage.finishCheckout();

    // 7. Verify order success
    await expect(checkoutPage.successMessage)
        .toHaveText('Thank you for your order!');
});
