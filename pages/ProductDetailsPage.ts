import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('button[data-test*="add-to-cart"], button:has-text("Add to cart")');
    }

    async expectOnProductDetailsPage() {
        await expect(this.page).toHaveURL(/inventory-item\.html/);
        await expect(this.addToCartButton).toBeVisible();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}
