import { expect, type Locator, type Page } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async expectOnCartPage() {
        await expect(this.page).toHaveURL(/cart\.html/);
        await expect(this.checkoutButton).toBeVisible();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }
}
