import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },

    reporter: 'cypress-mochawesome-reporter',
    specPattern: ['cypress/tests/**/*.spec.ts', 'cypress/integration/**/*.feature'],

    video: true,

    reporterOptions: {
      charts: true,
      reportPageTitle: 'custom-title',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    includeShadowDom: true,
    trashAssetsBeforeRuns: true,
    viewportHeight: 900,
    viewportWidth: 1400,
  },

  // save files
  screenshotsFolder: 'cypress/screens/screenshots',
  videosFolder: 'cypress/screens/videos',
});
