/// <reference types="Cypress" />

describe('Accordion component', () => {
  it('Is rendered', () => {
    cy.visit('/');
    cy.document().get('dl').should('exist');
  });

  it('<app-accordion> custom element registered in DOM', () => {
    cy.window()
      .its('customElements')
      .then((customElems) => {
        assert(customElems.get('app-accordion'));
      });
  });

  it('<dl> has custom styling', () => {
    cy.document()
      .get('dl')
      .then((dl) => {
        expect(dl).attr('class').to.equals('accordion');
      });
  });

  it('Accordion expand', () => {
    // no <dt> active yet
    cy.get('dl').get('.acc_title_active').should('not.exist');
    cy.get('dl')
      .get('dt')
      .first()
      .then((firstDt) => {
        firstDt.click();
        // <dt> active after click
        cy.get('dl').get('.acc_title_active').should('have.length', 1);
      });
  });

  it('Accordion toggle', () => {
    cy.get('dl')
      .get('dt:not(.acc_title_active)') // get a collapsed <dt>
      .first()
      .then((collapsedDt) => {
        collapsedDt.click();
        // only one <dt> must be active at a time
        cy.get('dl').get('.acc_title_active').should('have.length', 1);
      });
  });

  it('Accordion collapse', () => {
    cy.get('dl')
      .get('.acc_title_active')
      .first()
      .then((activeDt) => {
        // click the first active <dt>
        activeDt.click();
        // no <dt> is active anymore
        cy.get('dl').get('.acc_title_active').should('not.exist');
      });
  });
});
