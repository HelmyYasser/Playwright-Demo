# 🎭 Playwright SauceDemo E2E Automation

A professional, high-performance end-to-end automation framework built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/) targeting the [SauceDemo](https://www.saucedemo.com/) application. This project uses the **Page Object Model (POM)** design pattern to ensure scalability, clean code separation, and ease of maintenance.

---

## ✨ Features

- 🏗️ **Page Object Model (POM)**: Enforces modularity and reusability by encapsulating page-specific elements and actions in separate TypeScript classes.
- 🧪 **Comprehensive Core Scenarios**: Automated workflows covering user authentication, product sorting, shopping cart updates, and complete E2E checkout.
- ⚙️ **Configurability**: Loaded with environment variables via `dotenv` (e.g. customized user credentials, checkout details).
- 🌐 **Cross-browser Compatibility**: Built-in configurations to execute tests across major engines: Chromium, Firefox, and WebKit (Safari).
- 📊 **Rich Reporting & Debugging**: Configured with Playwright HTML Reporter, with dynamic traces collected on test failures.

---

## 📂 Project Directory Structure

```text
Playwright-Demo/
├── pages/                  # Page Object Model (POM) representations
│   ├── LoginPage.ts        # Handlers for login operations
│   ├── InventoryPage.ts    # Handlers for browsing, sorting, and adding items
│   ├── ProductDetailsPage.ts # Handlers for detailed product actions
│   ├── CartPage.ts          # Handlers for verifying/managing cart items
│   └── CheckoutPage.ts     # Handlers for E2E customer info & overview verification
├── specs/                  # Manual test plans or specification documents
│   └── README.md           # Guide to specifications
├── tests/                  # Automated test cases
│   ├── saucedemo-core-scenarios.spec.ts # Core E2E test suite
│   └── seed.spec.ts        # Seed/placeholder test
├── playwright.config.ts    # Playwright runner configuration (browsers, reporter, etc.)
├── package.json            # Node project configuration & dependencies
└── .env                    # Environment variables (Credentials & checkout details)
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Playwright-Demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the root directory based on your requirements:
   ```env
   STANDARD_USER=standard_user
   STANDARD_PASSWORD=secret_sauce
   CHECKOUT_FIRST_NAME=Test
   CHECKOUT_LAST_NAME=User
   CHECKOUT_POSTAL_CODE=12345
   ```

---

## 🧪 Running Tests

You can run your tests using npm scripts (configured in `package.json`) or directly using `npx playwright test`.

### Run All Tests (Headless Mode)
Runs all tests across all configured browsers (Chromium, Firefox, WebKit):
```bash
# Using npm script
npm run test

# Direct command
npx playwright test
```

### Run Tests in UI Mode
Launches Playwright's interactive runner to inspect, step through, and debug tests visually:
```bash
# Using npm script
npm run test:ui

# Direct command
npx playwright test --ui
```

### Run a Specific Test File
```bash
npx playwright test tests/saucedemo-core-scenarios.spec.ts
```

### Run on a Specific Browser Project
```bash
# Using npm script
npm run test:chromium

# Direct command
npx playwright test --project=chromium
```

### View Test Reports
After tests complete, view the detailed HTML report:
```bash
# Using npm script
npm run test:report

# Direct command
npx playwright show-report
```

---

## 📖 Test Scenarios Covered

The main suite ([saucedemo-core-scenarios.spec.ts](file:///c:/Helmy/Automation/Playwright-Demo/tests/saucedemo-core-scenarios.spec.ts)) automates these workflows:
1. **User Authentication (Login)**: Validates that valid users are redirected correctly to the inventory page.
2. **Inventory Browsing & Sorting**: Verifies that price sorting works correctly in ascending (`lohi`) and descending (`hilo`) directions.
3. **Shopping Cart Management**: Tests adding products from both the inventory catalog page and the product details page.
4. **End-to-End Checkout Flow**: Walks through adding products, checking out, entering user information, verifying calculations (subtotal and tax), and finalizing the order.

---

## 🤝 Best Practices & Implementation Details
- **Locators**: Elements are located using modern, resilient locators such as `data-test` attributes to prevent breaking tests due to style or DOM layout updates.
- **Environment Driven**: Dynamically references environment variables for usernames, passwords, and user details, keeping secrets and test parameters out of code files.
- **Robust Assertions**: Leverages web-first assertions like `expect(locator).toBeVisible()` to handle auto-waiting cleanly.
