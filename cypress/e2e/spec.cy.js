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
    username: '', // will be set once before tests run
    password: 'Password123!'
  };

  // Generate unique username once before all tests
  before(() => {
    newUser.username = `john${Cypress._.random(10000, 99999)}`;
  });
  
  it('1. User sees error on empty login fields', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.submit();
    cy.get('.error').should('contain.text', 'Please enter a username and password.');
  });

  it('2. User can navigate to About Us page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    cy.contains('About Us').click();
    cy.url().should('include', 'about.htm');
  });

  it('3. User can navigate to Contact page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    cy.contains('Contact').click();
    cy.url().should('include', 'contact.htm');
  });

  it('4. User can navigate to Services page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    cy.contains('Services').click();
    cy.url().should('include', 'services.htm');
  });

  it('5. User can navigate to Admin Page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/admin.htm');
    cy.contains('Administration').should('be.visible');
  });

  it('6. User sees error with partially empty login', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername('');
    loginPage.enterPassword('somepass');
    loginPage.submit();
    cy.get('.error').should('contain.text', 'Please enter a username and password.');
  });

  it('7. User can go back to home after About Us page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/about.htm');
    cy.contains('Home').click();
    cy.url().should('include', 'index.htm');
  });

});
