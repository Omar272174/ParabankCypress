import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import AccountOverviewPage from '../pages/AccountOverviewPage';
import TransferFundsPage from '../pages/TransferFundsPage';
import RegisterPage from '../pages/RegisterPage';

describe('ParaBank Tests', () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const accountOverviewPage = new AccountOverviewPage();
  const transferFundsPage = new TransferFundsPage();
  const registerPage = new RegisterPage();

  const newUser = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'City',
    state: 'State',
    zip: '12345',
    phone: '1234567890',
    ssn: '111-22-3333',
    username: 'john_doe_' + Date.now(),
    password: 'Password123!'
  };

  it('0. Register new user', () => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    registerPage.fillRegistrationForm(newUser);
    registerPage.submit();

    // It redirects to /overview.htm on success
    cy.url().should('include', '/overview.htm');
    homePage.clickLogout();
  });

  it('1. User can log in with valid credentials', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();

    cy.url().should('include', '/overview.htm');
    homePage.getWelcomeMessage().should('contain.text', 'Accounts Overview');
    homePage.clickLogout();
  });

  it('2. User cannot log in with invalid credentials', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername('wrongUser');
    loginPage.enterPassword('wrongPass');
    loginPage.submit();
    cy.get('.error').should('contain.text', 'The username and password could not be verified.');
  });

  it('3. User can view account overview after login', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();

    homePage.clickAccountOverview();
    accountOverviewPage.getAccountTable().should('be.visible');
    homePage.clickLogout();
  });

  it('4. User can transfer funds between accounts', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();

    homePage.clickTransferFunds();

    cy.get('#fromAccountId option').then(fromOptions => {
      const fromAccount = fromOptions.eq(1).val();

      cy.get('#toAccountId option').then(toOptions => {
        const toAccount = toOptions.eq(2).val();

        transferFundsPage.selectFromAccount(fromAccount);
        transferFundsPage.selectToAccount(toAccount);
        transferFundsPage.enterAmount('100');
        transferFundsPage.submitTransfer();

        transferFundsPage.getSuccessMessage().should('contain.text', 'Transfer Complete!');
        homePage.clickLogout();
      });
    });
  });

  it('6. User can log out successfully', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();

    homePage.clickLogout();
    cy.url().should('include', 'login.htm');
  });

  it('7. User sees error on empty login fields', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.submit();
    cy.get('.error').should('contain.text', 'Please enter a username and password.');
  });

  it('8. User can navigate to About Us page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    cy.contains('About Us').click();
    cy.url().should('include', 'about.htm');
  });

  it('9. User can navigate to Contact page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    cy.contains('Contact').click();
    cy.url().should('include', 'contact.htm');
  });

  it('10. User can access and view Open New Account page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();

    cy.contains('Open New Account').click();
    cy.url().should('include', 'openaccount.htm');
    homePage.clickLogout();
  });
});
