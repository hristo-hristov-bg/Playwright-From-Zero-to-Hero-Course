import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000, // global timeout for all expect statements
  },
  retries: 1,
  reporter: 'html',
  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : process.env.STAGING === '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',
    trace: 'on-first-retry',
    actionTimeout: 2000, // timeout for each action (click, fill, etc.)
    navigationTimeout: 25000, // timeout for navigation actions (goto, click that causes navigation, etc.)
    video: {
      mode: 'off', // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
      size: { width: 1920, height: 1080 },
    }
  },
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
      },
    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 },
      }
    }
  ],
});
