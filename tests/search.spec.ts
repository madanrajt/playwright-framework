import { test } from '@playwright/test';
import { BooksPage } from '../pages/BooksPage.js';
import { GooglePage } from '../pages/GooglePage.js';

/**
 * TEST FILE
 * ---------
 * This is the HEART of the framework — the actual test.
 *
 * Real life analogy:
 * Think of this like a TEST SCRIPT a manual QA tester follows:
 *   Step 1: Open the books website
 *   Step 2: Check it loaded correctly
 *   Step 3: Count the books
 *   Step 4: Search on Google
 *   Step 5: Verify results
 *   ...and so on.
 *
 * KEY POINT:
 * This file does NOT know HOW things work.
 * It just says WHAT to do — and the Page files handle the HOW.
 *
 * This makes tests very easy to READ and MAINTAIN.
 * Even a non-technical person can understand this file!
 */

test('Playwright concepts - all in one flow', async ({ page, browser }) => {

    // ── STEP 1: Setup Books Page ────────────────────────────────
    // Create a "remote control" for the books website
    const booksPage = new BooksPage(page);
    await booksPage.maximizeWindow();

    // ── STEP 2: Open Books Website ─────────────────────────────
    await booksPage.open();

    // ── STEP 3: Verify Page Loaded ─────────────────────────────
    // Checks URL, heading visible, heading text — all in one call
    await booksPage.assertPageLoaded();

    // ── STEP 4: Wait for Books to Appear ──────────────────────
    await booksPage.waitForBooks();

    // ── STEP 5: Count Books ────────────────────────────────────
    await booksPage.getBookCount();

    // ── STEP 6: Get First Book Title ───────────────────────────
    await booksPage.getFirstBookTitle();

    // ── STEP 7: Get All Prices ─────────────────────────────────
    await booksPage.getAllPrices();

    // ── STEP 8: Get First Book Link ────────────────────────────
    await booksPage.getFirstBookHref();

    // ── STEP 9: Screenshot of Homepage ────────────────────────
    await booksPage.takeScreenshot('homepage');

// ── STEP 10: Open Google in SAME browser (new page) ────
const googleTab = await browser.newPage();
const googlePage = new GooglePage(googleTab);

await googlePage.maximizeWindow();
await googlePage.open();

// ── STEP 11: Search ────────────────────────────────────
await googlePage.search('books.toscrape.com');

// ── STEP 12: Verify ────────────────────────────────────
await googlePage.assertResultsVisible();

// ── STEP 13: Screenshot ────────────────────────────────
await googlePage.takeScreenshot('search-results');

// ── STEP 14: Close Google Tab ──────────────────────────
await googleTab.close();

    // ── STEP 15: Back to Books — Click a Category ─────────────
    await booksPage.clickFirstCategory();

    // ── STEP 16: Screenshot of Category Page ──────────────────
    await booksPage.takeScreenshot('category-page');

});
