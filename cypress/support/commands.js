import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('login', (username, password) => {
  const loginPage = new LoginPage();
  loginPage.visit();
  loginPage.enterUsername(username);
  loginPage.enterPassword(password);
  loginPage.submit();
});

Cypress.Commands.add('logout', () => {
  cy.contains('Log Out').click();
});
