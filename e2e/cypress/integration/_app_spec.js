/// <reference types="Cypress" />

describe('Application health check', () => {
  it('Web server up and running', () => {
    cy.visit('/'); // change URL to match your dev URL
  });

  it('App object initialized', () => {
    cy.window().its('app').should('not.be.undefined');
  });
});
