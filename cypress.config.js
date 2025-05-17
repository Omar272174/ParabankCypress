const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://parabank.parasoft.com/parabank",
    specPattern: "cypress/e2e/**/*.cy.js",  
    setupNodeEvents(on, config) {
     
    },
  },
});
