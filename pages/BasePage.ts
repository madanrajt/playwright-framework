import { Page } from '@playwright/test';

/**
 * BASE PAGE
 * ---------
 * Think of this as the PARENT / FOUNDATION of all pages.
 *
 * In real life analogy:
 * Imagine a COMPANY has common rules for all employees —
 * "Everyone must clock in, take ID badge, follow safety rules."
 * BasePage = those common rules.
 *
 * Every page (BooksPage, GooglePage) EXTENDS this,
 * meaning they automatically get these common actions
 * WITHOUT writing the same code again.
 *
 * This is called: DRY principle → Don't Repeat Yourself
 */
export class BasePage {

    // 'page' is the browser tab — we store it so all methods can use it
    constructor(protected page: Page) {}

    /**
     * Opens a URL in the browser
     * Like typing a URL in the address bar and pressing Enter
     */
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        console.log(`✅ Navigated to: ${url}`);
    }

    /**
     * Takes a screenshot and saves it to /screenshots folder
     * Like pressing Print Screen on your keyboard
     */
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
        console.log(`✅ Screenshot saved: ${name}.png`);
    }

    /**
     * Sets the browser window to full screen size
     */
    async maximizeWindow(): Promise<void> {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        console.log('✅ Window maximized');
    }

    /**
     * Waits for a specific number of milliseconds
     * Like telling someone "wait 2 seconds before continuing"
     */
    async wait(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
