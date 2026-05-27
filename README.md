# 🎭 Playwright Framework — Page Object Model

A production-grade Playwright automation framework built with TypeScript.

---

## 📁 Project Structure

```
playwright-framework/
├── config/
│   └── playwright.config.ts   ← Settings (headless, video, screenshots, reports)
├── pages/
│   ├── BasePage.ts            ← Common actions shared by ALL pages
│   ├── BooksPage.ts           ← Everything related to books.toscrape.com
│   └── GooglePage.ts          ← Everything related to google.com
├── tests/
│   └── search.spec.ts         ← Actual test — WHAT to test
├── utils/
│   └── CaptchaHandler.ts      ← Reusable CAPTCHA handler
├── screenshots/               ← Screenshots saved here
├── package.json               ← Project dependencies & scripts
└── tsconfig.json              ← TypeScript settings
```

---

## 🧠 What Each File Does (Layman Terms)

| File | Real Life Analogy |
|------|------------------|
| `playwright.config.ts` | Main switch panel — controls how all tests run |
| `BasePage.ts` | Company rules that apply to ALL employees |
| `BooksPage.ts` | Remote control for the Books website |
| `GooglePage.ts` | Remote control for the Google website |
| `search.spec.ts` | The actual test script — WHAT to do step by step |
| `CaptchaHandler.ts` | A spare key — only used when CAPTCHA appears |
| `package.json` | Shopping list of all tools this project needs |
| `tsconfig.json` | Rules for how TypeScript converts to JavaScript |

---

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Run tests
npm test

# 4. View HTML report
npm run report
```

---

## 🏗️ Design Pattern Used

This framework uses the **Page Object Model (POM)** pattern.

```
tests/search.spec.ts        ← WHAT to test
        ↓ uses
pages/BooksPage.ts          ← HOW to interact with Books site
pages/GooglePage.ts         ← HOW to interact with Google
        ↓ both extend
pages/BasePage.ts           ← COMMON actions (navigate, screenshot, maximize)
        ↓ uses
utils/CaptchaHandler.ts     ← REUSABLE utilities
        ↓ all configured by
config/playwright.config.ts ← Reports, video, screenshots settings
```

### Why POM?
- ✅ If a selector changes, fix it in ONE place only
- ✅ Tests are clean and readable — even non-technical people can understand
- ✅ Each file has ONE job (Single Responsibility)
- ✅ No repeated code anywhere (DRY — Don't Repeat Yourself)

---

## 📊 What Gets Generated

After running tests:
- `playwright-report/` → Beautiful HTML report (open in browser)
- `test-results/` → Videos and screenshots of each test run
- `screenshots/` → Manual screenshots taken during test

---

## 🌐 Playwright Scope

| Can Automate | Cannot Automate |
|-------------|----------------|
| ✅ Web Applications | ❌ Native Android apps (APK) |
| ✅ Mobile Web Views | ❌ Native iOS apps (IPA) |
| ✅ Progressive Web Apps | ❌ Desktop apps |

> For native mobile apps → use **Appium** instead.
