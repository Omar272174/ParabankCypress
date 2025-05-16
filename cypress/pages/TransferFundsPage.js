class TransferFundsPage {
    enterAmount(amount) {
      cy.get('#amount').clear().type(amount);
    }
    selectFromAccount(account) {
      cy.get('#fromAccountId').select(account);
    }
    selectToAccount(account) {
      cy.get('#toAccountId').select(account);
    }
    submitTransfer() {
      cy.get('input[value="Transfer"]').click();
    }
    getSuccessMessage() {
      return cy.contains('Transfer Complete!');
    }
  }
  export default TransferFundsPage;
  
  
  