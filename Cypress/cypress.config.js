const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
