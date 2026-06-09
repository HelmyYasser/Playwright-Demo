import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.subtotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.completeHeader = page.locator('.complete-header');
    }

    async expectOnCheckoutStepOne() {
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postalCodeInput).toBeVisible();
    }

    async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        return this;
    }

    async continueToOverview() {
        await this.continueButton.click();
        return this;
    }

    async expectOnCheckoutOverview() {
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
        await expect(this.subtotalLabel).toBeVisible();
        await expect(this.taxLabel).toBeVisible();
    }

    async verifyOverviewTotals(expectedSubtotal: number, expectedTax: number) {
        await expect(this.subtotalLabel).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);
        await expect(this.taxLabel).toHaveText(`Tax: $${expectedTax.toFixed(2)}`);
        return this;
    }

    async finishOrder() {
        await this.finishButton.click();
        return this;
    }

    async expectOrderComplete() {
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }
}
