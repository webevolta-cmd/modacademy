import { defineConfig, devices } from '@playwright/test';

// Set PW_CHROMIUM_PATH to use a pre-installed Chromium instead of `npx playwright install`.
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4322';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL,
    launchOptions: { executablePath },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, launchOptions: { executablePath } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions: { executablePath } } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'node scripts/serve-dist.mjs dist 4322',
        url: 'http://127.0.0.1:4322/',
        reuseExistingServer: true,
      },
});
