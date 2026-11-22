
import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly cartTitle: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(private page: Page) {
        this.cartTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
    }

    async verifyCartPage(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
