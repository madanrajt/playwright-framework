import { Page } from '@playwright/test';

/**
 * CAPTCHA HANDLER
 * ---------------
 * This is a UTILITY — a helper tool that does ONE specific job.
 *
 * Real life analogy:
 * Think of this like a "spare key" in your house.
 * You don't always need it, but when the situation comes,
 * it's right there and it works.
 *
 * CAPTCHA may or may not appear when opening Google.
 * Instead of writing this try/catch in EVERY page file,
 * we write it ONCE here and call it wherever needed.
 *
 * This is called: SINGLE RESPONSIBILITY PRINCIPLE
 * → One class = One job
 */
export class CaptchaHandler {

    /**
     * Tries to find and click the "I'm not a robot" checkbox.
     * If CAPTCHA doesn't appear within 3 seconds → silently continues.
     * If CAPTCHA appears → clicks it and waits for verification.
     */
    static async handle(page: Page): Promise<void> {
        try {
            const captchaFrame = page.frameLocator('iframe[title*="reCAPTCHA"]');
            const checkbox = captchaFrame.locator('#recaptcha-anchor');

            // Wait max 3 seconds for CAPTCHA to appear
            await checkbox.waitFor({ timeout: 3000 });

            // If we reached here — CAPTCHA appeared! Click it.
            await checkbox.click();
            console.log('✅ CAPTCHA detected and clicked');

            // Give it 2 seconds to verify
            await page.waitForTimeout(2000);

        } catch {
            // CAPTCHA did NOT appear — this is totally fine, just continue
            console.log('✅ No CAPTCHA detected, continuing...');
        }
    }
}
