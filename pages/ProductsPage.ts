import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly pageTitle: Locator;
    readonly addToCartButton: Locator;
    readonly cartIcon: Locator;

    constructor(private page: Page) {
        this.pageTitle = page.locator('.title');
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async openCart(): Promise<void> {
        await this.cartIcon.click();
    }
}