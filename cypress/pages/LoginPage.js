class LoginPage {
  enterUsername(username) {
    if (username) {
      cy.get('input[name="username"]').type(username);
    }
  }
  enterPassword(password) {
    if (password) {
      cy.get('input[name="password"]').type(password);
    }
  }
  
  
    submit() {
      cy.get('input[value="Log In"]').click();
    }
  }
  
  export default LoginPage;
  
  