// Import Cypress commands and assertions
import { Given, When, Then , And} from 'cypress-cucumber-preprocessor/steps';

// Given step: Set up the initial context
Given('I open login page', () => {
  // Visit a URL to your homepage)
  cy.visit('http://zero.webappsecurity.com/login.html');
});

// When step: Navigate to the Google website
When('I submit login', () => {
  // fill user name
  cy.get('#user_login').type('username');
  // fill password
  cy.get('#user_password').type('password');
  // click login button
  cy.get('input[name="submit"]').click();
});

// Then step: Verify Google homepage elements
Then('I should see homepage', () => {
  // Assert that the search bar and Google logo elements are visible
  cy.get('#account_summary_tab').should('be.visible');

});