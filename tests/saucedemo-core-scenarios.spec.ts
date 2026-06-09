import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const STANDARD_USER = process.env.STANDARD_USER ?? 'standard_user';
const STANDARD_PASSWORD = process.env.STANDARD_PASSWORD ?? 'secret_sauce';
const CHECKOUT_FIRST_NAME = process.env.CHECKOUT_FIRST_NAME ?? 'Test';
const CHECKOUT_LAST_NAME = process.env.CHECKOUT_LAST_NAME ?? 'User';
const CHECKOUT_POSTAL_CODE = process.env.CHECKOUT_POSTAL_CODE ?? '12345';

function sortAscending(values: number[]) {
  return [...values].sort((a, b) => a - b);
}

function sortDescending(values: number[]) {
  return [...values].sort((a, b) => b - a);
}

test.describe('Sauce Demo Core Scenarios', () => {
  test('User Authentication (Login)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await inventoryPage.expectOnInventoryPage();
  });

  test('Inventory Browsing, Sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await inventoryPage.expectOnInventoryPage();

    await inventoryPage.selectSort('lohi');
    const lowToHighPrices = await inventoryPage.getInventoryPrices();
    expect(lowToHighPrices).toEqual(sortAscending(lowToHighPrices));

    await inventoryPage.selectSort('hilo');
    const highToLowPrices = await inventoryPage.getInventoryPrices();
    expect(highToLowPrices).toEqual(sortDescending(highToLowPrices));
  });

  test('Shopping Cart Management', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await inventoryPage.expectOnInventoryPage();

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.getCartBadge()).toHaveText('2');

    const productDetails = await inventoryPage.openProductDetails('Sauce Labs Bolt T-Shirt');
    await productDetails.expectOnProductDetailsPage();
    await productDetails.addToCart();
    await expect(inventoryPage.getCartBadge()).toHaveText('3');
  });

  test('End-to-End Checkout Flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await inventoryPage.expectOnInventoryPage();

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    const cartPage = await inventoryPage.openCart();
    await cartPage.expectOnCartPage();

    const checkoutPage = await cartPage.proceedToCheckout();
    await checkoutPage.expectOnCheckoutStepOne();
    await checkoutPage.fillCustomerInformation(CHECKOUT_FIRST_NAME, CHECKOUT_LAST_NAME, CHECKOUT_POSTAL_CODE);
    await checkoutPage.continueToOverview();

    await checkoutPage.expectOnCheckoutOverview();

    const subtotal = 29.99 + 9.99;
    const tax = parseFloat((subtotal * 0.08).toFixed(2));
    await checkoutPage.verifyOverviewTotals(subtotal, tax);

    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });
});
