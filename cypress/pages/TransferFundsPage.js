class TransferFundsPage {
    selectFromAccount(accountId) {
      cy.get('#fromAccountId').select(accountId);
    }
  
    selectToAccount(accountId) {
      cy.get('#toAccountId').select(accountId);
    }
  
    enterAmount(amount) {
      cy.get('input[name="amount"]').clear().type(amount);
    }
  
    submitTransfer() {
      cy.get('input[type="submit"]').click();
    }
  
    getSuccessMessage() {
      return cy.contains('Transfer Complete!');
    }
  }
  
  export default TransferFundsPage;
  
  
  
  