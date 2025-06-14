const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: 'src/__tests__/e2e/**/*.cy.{js,ts}',
    screenshotsFolder: 'src/__tests__/evidence',
    video: false,
  },
});
