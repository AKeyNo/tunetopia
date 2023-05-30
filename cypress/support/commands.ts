/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      signUpCustom(username: string, password: string): Chainable<void>;
      signInCustom(username: string, password: string): Chainable<void>;
      signOut(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('signUpCustom', (username: string, password: string) => {
  // check to see if the sign out button isn't there and that the sign in and sign up buttons are there
  cy.get('[data-cy=sign-out-button]').should('not.exist');
  cy.get('[data-cy=sign-in-button]').should('exist');
  cy.get('[data-cy=sign-up-button]').should('exist');
  cy.get(`[data-cy=username-${username}]`).should('not.exist');

  cy.get('[data-cy=sign-up-email-error]').should('not.exist');
  cy.get('[data-cy=sign-up-username-error]').should('not.exist');
  cy.get('[data-cy=sign-up-password-error]').should('not.exist');
  cy.get('[data-cy=sign-up-confirm-password-error]').should('not.exist');

  // enter valid data into the sign up form
  cy.get('[data-cy=sign-up-button]').click();
  cy.get('[data-cy=sign-up-email-input]')
    .should('have.value', '')
    .type(`${username}@example.com`);
  cy.get('[data-cy=sign-up-username-input]')
    .should('have.value', '')
    .type(username);
  cy.get('[data-cy=sign-up-password-input]')
    .should('have.value', '')
    .type(password);
  cy.get('[data-cy=sign-up-confirm-password-input]')
    .should('have.value', '')
    .type(password);

  // make sure errors for each field are not there
  cy.get('[data-cy=sign-up-email-error]').should('not.exist');
  cy.get('[data-cy=sign-up-username-error]').should('not.exist');
  cy.get('[data-cy=sign-up-password-error]').should('not.exist');
  cy.get('[data-cy=sign-up-confirm-password-error]').should('not.exist');

  // submit the form
  cy.get('[data-cy=sign-up-submit-button]').click();
  cy.get('[data-cy=sign-up-loading]');
  cy.get(`[data-cy=user-username-${username}]`)
    .should('exist')
    .contains(`${username}`);
});

Cypress.Commands.add('signInCustom', (username: string, password: string) => {
  cy.get('[data-cy="sign-in-button"]').click();
  cy.get('[data-cy="sign-in-email-input"]').type(`${username}@example.com`);
  cy.get('[data-cy="sign-in-password-input"]').type(password);
  cy.get('[data-cy="sign-in-submit-button"]').click();
  cy.get(`[data-cy=user-username-${username}]`)
    .should('exist')
    .contains(`${username}`);
});

Cypress.Commands.add('signOut', () => {
  cy.get('[data-cy=sign-out-button]').click();
  cy.get('[data-cy=sign-out-button]').should('not.exist');
  cy.get('[data-cy=sign-in-button]').should('exist');
  cy.get('[data-cy=sign-up-button]').should('exist');
});

export {};
