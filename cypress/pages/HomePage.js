class HomePage {
    clickLogout() {
      cy.contains('Log Out').click();
    }
  
    clickAccountOverview() {
      cy.contains('Accounts Overview').click();
    }
  
    clickTransferFunds() {
      cy.contains('Transfer Funds').click();
    }
  
    getWelcomeMessage() {
      return cy.get('h1.title');
    }
  }
  
  export default HomePage;
  
  