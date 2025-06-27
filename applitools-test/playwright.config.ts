import { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig<EyesFixture>({

  reporter: '@applitools/eyes-playwright/reporter',

  use: {
    /* Configuration for Eyes VisualAI */
    eyesConfig: {
      /* The following and other configuration parameters are documented at: <url> */
      apiKey: 'u988bBzJFwVL44cZR1p05mGDEHUWDypvae83ECjbyVjg110', // alternatively, set this via environment variable APPLITOOLS_API_KEY

    },

    baseURL: 'http://localhost:4200',
    viewport: { height: 720, width: 1280 }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

});
