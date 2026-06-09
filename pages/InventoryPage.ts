import { expect, type Locator, type Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { ProductDetailsPage } from './ProductDetailsPage';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly sortSelect: Locator;
    readonly shoppingCartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.sortSelect = page.locator('select.product_sort_container');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async expectOnInventoryPage() {
        await expect(this.page).toHaveURL(/inventory\.html/);
        await expect(this.title).toHaveText('Products');
    }

    async selectSort(value: 'lohi' | 'hilo') {
        await this.sortSelect.selectOption(value);
    }

    async getInventoryPrices() {
        const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
        return priceTexts.map((price) => parseFloat(price.replace('$', '').trim()));
    }

    async addItemToCart(itemName: string) {
        const itemCard = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await expect(itemCard).toBeVisible();
        await itemCard.locator('button:has-text("Add to cart")').click();
    }

    async openProductDetails(itemName: string) {
        const itemNameLocator = this.page.locator('.inventory_item_name').filter({ hasText: itemName });
        await expect(itemNameLocator).toBeVisible();
        await itemNameLocator.click();
        return new ProductDetailsPage(this.page);
    }

    getCartBadge() {
        return this.cartBadge;
    }

    async openCart() {
        await this.shoppingCartLink.click();
        return new CartPage(this.page);
    }
}
