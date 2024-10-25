import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:8100', 
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}', 
  },
});
