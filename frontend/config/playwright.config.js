// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import path from 'path';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/users.json');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  //globalSetup: require.resolve('./global-setup'),
  //globalTeardown: require.resolve('./global-teardown'),
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 10,
    },
    toMatchSnapshot:  {
      maxDiffPixelRatio: 0.1,
    },
  },
  testDir: '../src/tests/pw-tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "http://localhost:8080",
    //storageState: 'users.json',
    trace: 'on',
    screenshot: 'only-on-failure', // Capture screenshot after each test failure.
    video: 'retain-on-failure', //Record video only when retrying a test for the first time.
    headless: true,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
        slowMo: 50,
        logger: {
            isEnabled: (name, severity) => name === 'browser',
            log: (name, severity, message, args) => console.log(`${name} ${message}`)
        }
    },
    //actionTimeout: 10 * 1000,
    //navigationTimeout: 30 * 1000
},
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global setup',
      testMatch: /global\.setup\.js/,
    },
    {
      name: 'setup',
      testMatch: '**/*.setup.js',
    },
   /* {
      name: 'logged in as kimgjon',
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
      },
    },*/
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    }, 
    {
       name: 'Mobile Chrome',
       use: { ...devices['Pixel 5'] },
       dependencies: ['setup'],
     },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

