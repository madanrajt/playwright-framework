import { defineConfig } from '@playwright/test';

/**
 * PLAYWRIGHT CONFIG — CI/CD Ready
 * ─────────────────────────────────────────────────────────
 * process.env.CI is automatically set to "true" by GitHub Actions.
 * We use it to switch between LOCAL and CI behaviour:
 *
 *  Setting        LOCAL           CI (GitHub Actions)
 *  ─────────────────────────────────────────────────
 *  headless       false (see UI)  true (no screen)
 *  retries        1               2 (more forgiving in CI)
 *  reporter       html + open     html + list (never auto-open)
 *  video          on              retain-on-failure (saves space)
 */

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: './tests',
    retries: isCI ? 2 : 1,
    workers: 1,
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: isCI ? 'never' : 'always' }],
        ['list'],   // Print results to console (visible in GitHub Actions logs)
    ],
    use: {
        headless: isCI ? true : false,  // headless in CI, headed locally
        screenshot: 'on',
        video: isCI ? 'retain-on-failure' : 'on',
        viewport: { width: 1920, height: 1080 },
        actionTimeout: 10000,
        navigationTimeout: 30000,
    },
});
