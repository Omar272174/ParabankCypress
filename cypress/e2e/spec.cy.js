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

  it('1. Register new user', () => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    registerPage.fillRegistrationForm(newUser);
    registerPage.submit();

    cy.location('pathname', { timeout: 10000 }).then(path => {
      if (path.includes('/overview.htm')) {
        cy.log('✅ Registration successful');
        homePage.clickLogout();
      } else {
        cy.get('body').then($body => {
          if ($body.text().toLowerCase().includes('username already exists')) {
            throw new Error('❌ Registration failed: Username already exists');
          } else {
            throw new Error('❌ Registration failed for unknown reason');
          }
        });
      }
    });
  });


  it('2. User cannot log in with invalid credentials', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername('wrongUser');
    loginPage.enterPassword('wrongPass');
    loginPage.submit();
  
   
    cy.url().should('include', '/login.htm');
  
    cy.get('.error').should('contain.text', 'The username and password could not be verified.');
  });
  

  it('3. User cannot log in with invalid credentials', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername('wrongUser');
    loginPage.enterPassword('wrongPass');
    loginPage.submit();
    cy.get('.error').should('contain.text', 'The username and password could not be verified.');
  });

  it('4. User can view account overview after login', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();
  
    cy.url().should('include', '/overview.htm');
    cy.contains('Accounts Overview', { timeout: 10000 }).should('be.visible');
  
    homePage.clickAccountOverview();
    accountOverviewPage.getAccountTable().should('be.visible');
  
    homePage.clickLogout();
  });
  

  it('5. User can transfer funds between accounts', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();
  
    cy.url().should('include', '/overview.htm');
    cy.contains('Accounts Overview', { timeout: 8000 }).should('be.visible');
  
    homePage.clickTransferFunds();
  
    cy.contains('Transfer Funds', { timeout: 8000 }).should('be.visible');
  
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
  
    // Confirm logged in
    cy.url().should('include', '/overview.htm');
    cy.contains('Log Out').should('be.visible').click();
  
    // After logout, expect URL includes index.htm (not login.htm)
    cy.url().should('include', '/index.htm');
  

    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
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

  it('11. User can navigate to Services page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    cy.contains('Services').click();
    cy.url().should('include', 'services.htm');
  });

  it('12. User can navigate to Admin Page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/admin.htm');
    cy.contains('Administration').should('be.visible');
  });

  it('13. User sees error with partially empty login', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername('');
    loginPage.enterPassword('somepass');
    loginPage.submit();
    cy.get('.error').should('contain.text', 'Please enter a username and password.');
  });

  it('14. User can go back to home after About Us page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/about.htm');
    cy.contains('Home').click();
    cy.url().should('include', 'index.htm');
  });

  it('15. User cannot transfer negative funds', () => {
    cy.visit('https://parabank.parasoft.com/parabank/');
    loginPage.enterUsername(newUser.username);
    loginPage.enterPassword(newUser.password);
    loginPage.submit();
    homePage.clickTransferFunds();
    transferFundsPage.enterAmount('-50');
    transferFundsPage.submitTransfer();
    cy.contains('amount must be greater than zero').should('exist');
    homePage.clickLogout();
  });
});
