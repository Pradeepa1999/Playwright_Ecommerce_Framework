
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;

    constructor(private page: Page) {
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.successMessage = page.locator('.complete-header');
    }

    async enterCustomerDetails(
        first: string,
        last: string,
        postal: string
    ): Promise<void> {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(postal);
        await this.continueButton.click();
    }

    async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }
}
