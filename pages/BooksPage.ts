import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * BOOKS PAGE
 * ----------
 * This file represents the BOOKS WEBSITE (books.toscrape.com)
 *
 * Real life analogy:
 * Think of this as a "REMOTE CONTROL" for the books website.
 * Just like a TV remote has buttons for Volume, Channel, Power —
 * this file has "buttons" (methods) for everything you do on the books site:
 *   - Open the site
 *   - Count books
 *   - Get book titles
 *   - Click a category
 *   etc.
 *
 * The TEST FILE does not know HOW these things work —
 * it just says "hey BooksPage, click the category" and it happens.
 * This is called ABSTRACTION.
 */
export class BooksPage extends BasePage {

    // ── LOCATORS ────────────────────────────────────────────────
    // Locators are like "addresses" of elements on the page.
    // Instead of writing the selector everywhere, we define it ONCE here.
    // If Google changes their HTML tomorrow, we only fix it in ONE place.

    private heading        = this.page.locator('h1');
    private books          = this.page.locator('.product_pod');
    private bookTitles     = this.page.locator('.product_pod h3 a');
    private bookPrices     = this.page.locator('.price_color');
    private categories     = this.page.locator('.side_categories a');

    constructor(page: Page) {
        super(page); // calls BasePage constructor — gives us navigate(), screenshot() etc.
    }

    // ── ACTIONS ─────────────────────────────────────────────────

    /** Opens the books website */
    async open(): Promise<void> {
        await this.navigate('https://books.toscrape.com');
    }

    /** Checks the page loaded correctly — URL, heading visible, heading text */
    async assertPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL('https://books.toscrape.com/');
        await expect(this.heading).toBeVisible();
        await expect(this.heading).toHaveText('All products');
        console.log('✅ Books page fully loaded and verified');
    }

    /** Waits until book cards appear on screen */
    async waitForBooks(): Promise<void> {
        await this.books.first().waitFor();
        console.log('✅ Books are loaded on screen');
    }

    /** Counts how many books are on the current page */
    async getBookCount(): Promise<number> {
        const count = await this.books.count();
        console.log(`✅ Total books on page: ${count}`);
        return count;
    }

    /** Gets the title of the very first book */
    async getFirstBookTitle(): Promise<string> {
        const title = await this.bookTitles.first().textContent() ?? '';
        console.log(`✅ First book title: ${title}`);
        return title;
    }

    /** Gets ALL prices shown on the page */
    async getAllPrices(): Promise<string[]> {
        const prices = await this.bookPrices.allTextContents();
        console.log(`✅ First 5 prices: ${prices.slice(0, 5)}`);
        return prices;
    }

    /** Gets the href link attribute of the first book */
    async getFirstBookHref(): Promise<string> {
        const href = await this.bookTitles.first().getAttribute('href') ?? '';
        console.log(`✅ First book link: ${href}`);
        return href;
    }

    /** Clicks the first category in the sidebar and waits for navigation */
    async clickFirstCategory(): Promise<void> {
        await this.categories.nth(1).click();
        await this.page.waitForURL(/catalogue/);
        console.log('✅ Clicked category — URL changed to catalogue');
    }
}
