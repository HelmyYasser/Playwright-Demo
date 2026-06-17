# 🎭 SauceDemo E2E Automation Framework (Playwright & TypeScript)

An enterprise-grade, highly scalable end-to-end automation framework built using **Playwright** and **TypeScript** to automate critical user journeys on the [SauceDemo](https://www.saucedemo.com/) web application. 

This framework was architected by a Senior Test Automation Engineer with a strong emphasis on **scalability**, **maintainability**, **resilience**, and **observability**.

---

## 🏗️ Architectural Blueprint

The framework implements industry-standard automation patterns designed to minimize maintenance overhead and eliminate flaky tests:

### 1. Page Object Model (POM) with Method Chaining
Page elements and user interactions are encapsulated within dedicated page classes inside the `pages/` directory. 
- **Separation of Concerns**: Test specifications focus strictly on user behavior and assertions, while Page Objects handle the underlying DOM structure, locators, and actions.
- **Fluent/Chaining API**: Action methods (such as navigating or completing a step) return the instance of the next page object (e.g., `login()` in [LoginPage.ts](file:///c:/Helmy/Automation/Playwright-Demo/pages/LoginPage.ts) returns `InventoryPage`). This enforces type-safe page transitions and enables clean, readable, and self-documenting test scripts.

### 2. Resilient Selector Strategy
Rather than relying on fragile CSS hierarchies, absolute XPaths, or mutable text labels, the framework prioritizes **resilient test locators**. We target dedicated test attributes:
- E.g., `page.locator('[data-test="username"]')`
This ensures tests remain green even when CSS styles, layouts, or wording change.

### 3. Config-Driven & Environmental Decoupling
Test credentials, user information, and checkout data are entirely decoupled from the test codebase. They are injected at runtime using environment variables managed via `dotenv`.

---

## 📂 Project Directory Structure

```text
Playwright-Demo/
├── pages/                  # Page Object Model Layer (Encapsulates selectors & actions)
│   ├── LoginPage.ts        # Handlers for landing, credentials entry, & navigation
│   ├── InventoryPage.ts    # Handlers for product catalogs, sorting, and cart additions
│   ├── ProductDetailsPage.ts # Handlers for product detail-specific actions
│   ├── CartPage.ts          # Handlers for validating shopping cart contents
│   └── CheckoutPage.ts     # Handlers for E2E customer details, pricing calculations & validation
├── specs/                  # Test planning and specifications
│   └── README.md           # Documentation for manual test design
├── tests/                  # Test Specification Layer (Focuses on scenarios & assertions)
│   ├── saucedemo-core-scenarios.spec.ts # Core E2E test suite
│   └── seed.spec.ts        # Template/sandbox spec file
├── playwright.config.ts    # Playwright E2E Test Runner Engine configuration
├── package.json            # Node project configuration, scripts, and dependencies
└── .env                    # Local environment secrets and test data (Ignored by Git)
```

---

## ⚙️ Configuration & E2E Capabilities

Our [playwright.config.ts](file:///c:/Helmy/Automation/Playwright-Demo/playwright.config.ts) is tailored for production-ready continuous integration (CI) and local debugging:
- **Parallel Execution**: `fullyParallel: true` is enabled to optimize execution time across multiple workers.
- **Smart Retries**: Dynamically configured to execute retries in CI environments to combat environmental flakiness while keeping local debug cycles fast.
- **Multi-Browser Matrix**: Targets Chrome, Firefox, and WebKit to cover all modern rendering engines.
- **Diagnostic Tracing**: Captures detailed trace files (`on-first-retry`) containing network intercepts, console logs, and visual screenshots for failing runs.

---

## 🚀 Getting Started

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)

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

3. **Install Playwright browser binaries and dependencies:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Setup Environment Variables:**
   Create a `.env` file in the root directory. This file holds test execution credentials:
   ```env
   STANDARD_USER=standard_user
   STANDARD_PASSWORD=secret_sauce
   CHECKOUT_FIRST_NAME=Test
   CHECKOUT_LAST_NAME=User
   CHECKOUT_POSTAL_CODE=12345
   ```

---

## 🧪 Executing Tests

The framework supports multiple runner entry points for local debugging and CI execution:

### 1. Headless E2E Run (Standard CI Run)
Runs the entire suite across Chromium, Firefox, and WebKit:
```bash
# Using npm script
npm run test

# Direct command
npx playwright test
```

### 2. Interactive UI Mode (Best for local test development)
Provides a real-time visual UI showing selector matches, time travel debugging, and execution logs:
```bash
# Using npm script
npm run test:ui

# Direct command
npx playwright test --ui
```

### 3. Target Specific Browser Engine
```bash
# Using npm script
npm run test:chromium

# Direct command
npx playwright test --project=chromium
```

### 4. Execute a Specific Test Suite
```bash
npx playwright test tests/saucedemo-core-scenarios.spec.ts
```

### 5. Inspect Test Reports & Diagnostics
Launches the HTML report containing test steps, screenshot verification, and trace logs:
```bash
# Using npm script
npm run test:report

# Direct command
npx playwright show-report
```

---

## 📖 Test Coverage Matrix

The core suite ([saucedemo-core-scenarios.spec.ts](file:///c:/Helmy/Automation/Playwright-Demo/tests/saucedemo-core-scenarios.spec.ts)) covers critical user journeys:

| Test Scenario | Objectives | Key Assertions / Verifications |
| :--- | :--- | :--- |
| **User Authentication (Login)** | Validate standard user login & navigation | Verify redirection to URL, inventory list display |
| **Inventory Browsing & Sorting** | Verify catalog price sorting functionality | Validate that prices match ascending (`lohi`) and descending (`hilo`) arrays |
| **Shopping Cart Management** | Validate adding items from catalog & details pages | Assert cart badge increment and sync across pages |
| **End-to-End Checkout Flow** | Complete purchase from cart to order confirmation | Validate correct subtotal, precise tax calculation (8%), order completion confirmation screen |

---

## 🛡️ QA Best Practices Implemented

- **Web-First Assertions**: Uses auto-waiting assertions (like `toHaveURL` and `toBeVisible`) which query the DOM dynamically and reduce unnecessary hard sleeps.
- **Atomic Operations**: Tests are designed to be independent of each other, allowing execution in parallel in any order.
- **Dynamic Math Validations**: In the E2E checkout, tax and subtotal calculations are dynamically calculated and asserted instead of using hardcoded mock values.
