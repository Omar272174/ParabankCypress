class HomePage {
    getWelcomeMessage() {
      return cy.get('h1');  // The heading on Accounts Overview page
    }
    clickAccountOverview() {
      cy.contains('Accounts Overview').click();
    }
    clickTransferFunds() {
      cy.contains('Transfer Funds').click();
    }
    clickLogout() {
      cy.contains('Log Out').click();
    }
  }
  export default HomePage;
  
  