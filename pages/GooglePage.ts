import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { CaptchaHandler } from '../utils/CaptchaHandler.js';

export class GooglePage extends BasePage {

    // ── LOCATORS ──────────────────────────────────────────────
    private searchBox = this.page.locator('textarea#APjFqb');

    constructor(page: Page) {
        super(page);
    }

    // ── ACTIONS ───────────────────────────────────────────────

    async open(): Promise<void> {
        await this.navigate('https://www.google.com');
        await CaptchaHandler.handle(this.page);
    }

    async search(query: string): Promise<void> {
        await this.searchBox.fill(query);
        await this.searchBox.press('Enter');
        await this.page.waitForURL(/search/);
        console.log(`✅ Searched for: "${query}"`);
    }

    async assertResultsVisible(): Promise<void> {
        await this.page.waitForURL(/search/, { timeout: 10000 });
        console.log('✅ Search results URL verified');
    }
}