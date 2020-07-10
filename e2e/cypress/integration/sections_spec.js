/// <reference types="Cypress" />

describe('Adding sections', () => {
  it('Form validations', () => {
    cy.visit('/');
    cy.get('input').as('titleInput');
    cy.get('textarea').as('contentTextarea');
    cy.get('.error').as('errors');

    cy.get('@errors').eq(0).should('be.empty');
    cy.get('@errors').eq(1).should('be.empty');

    cy.get('button').click();

    cy.get('@errors').eq(0).should('not.be.empty');
    cy.get('@errors').eq(1).should('not.be.empty');

    cy.get('@titleInput').type('Test section');
    cy.get('button').click();
    cy.get('@errors').eq(0).should('be.empty');
    cy.get('@errors').eq(1).should('not.be.empty');
  });

  it('Add a new section', () => {
    cy.get('input').as('titleInput');
    cy.get('textarea').as('contentTextarea');
    cy.get('.error').as('errors');

    cy.get('dl')
      .children()
      .its('length')
      .then((initialLength) => {
        cy.get('@contentTextarea').type('This is the test content!');
        cy.get('button').click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('@errors').eq(0).should('be.empty');
        cy.get('@errors').eq(1).should('be.empty');

        cy.get('@titleInput').should('be.empty');
        cy.get('@contentTextarea').should('be.empty');

        cy.get('dl')
          .children()
          .its('length')
          .should('equal', initialLength + 2);
      });
  });
});
