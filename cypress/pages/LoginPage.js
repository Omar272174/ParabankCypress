class LoginPage {
    visit() {
        cy.visit('https://parabank.parasoft.com/parabank/login.htm', { failOnStatusCode: false });
      }
      
      
    enterUsername(username) {
      cy.get('input[name="username"]').clear().type(username);
    }
    enterPassword(password) {
      cy.get('input[name="password"]').clear().type(password);
    }
    submit() {
      cy.get('input[value="Log In"]').click();
    }
  }
  export default LoginPage;
  