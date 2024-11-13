import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100', 
    chromeWebSecurity: false, 
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}', 
  },
});
