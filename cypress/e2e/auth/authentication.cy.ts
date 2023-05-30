describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
    Cypress.session.clearAllSavedSessions();
  });

  it('should create a new user, log in, and log out', () => {
    const username = `sign-up-process-test-${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    const password = Math.random().toString();

    cy.signUpCustom(username, password);

    cy.signOut();
    cy.get(`[data-cy=username-${username}]`).should('not.exist');

    cy.signInCustom(username, password);

    cy.signOut();
    cy.get(`[data-cy=username-${username}]`).should('not.exist');
  });

  // invalid data for emails, nonexistent usernames, < 6 characters passwords, and passwords that don't match
  it('should make sign up not work with invalid data', () => {
    const username = `sign-up-process-test-${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    const password = Math.random().toString();

    // check to see if the sign out button isn't there and that the sign in and sign up buttons are there
    cy.get('[data-cy=sign-out-button]').should('not.exist');
    cy.get('[data-cy=sign-in-button]').should('exist');
    cy.get('[data-cy=sign-up-button]').should('exist');
    cy.get(`[data-cy=username-${username}]`).should('not.exist');

    // check for the @ sign and if it is blank
    cy.get('[data-cy=sign-up-button]').click();
    cy.get('[data-cy=sign-up-email-input]')
      .should('have.value', '')
      .type(username);
    cy.get('[data-cy=sign-up-email-error]')
      .should('exist')
      .contains('Email is invalid');
    cy.get('[data-cy=sign-up-email-input]').clear();
    cy.get('[data-cy=sign-up-email-error]').contains('Email is required');
    cy.get('[data-cy=sign-up-email-input]').type(`${username}@example.com`);
    cy.get('[data-cy=sign-up-email-error]').should('not.exist');

    // check for the username and if it is blank
    cy.get('[data-cy=sign-up-username-input]').type(username);
    cy.get('[data-cy=sign-up-username-error]').should('not.exist');
    cy.get('[data-cy=sign-up-username-input]').clear();
    cy.get('[data-cy=sign-up-username-error]').contains('Username is required');
    cy.get('[data-cy=sign-up-username-input]').type(username);
    cy.get('[data-cy=sign-up-username-error]').should('not.exist');

    // check for the password's length and if it is blank
    cy.get('[data-cy=sign-up-password-input]')
      .should('have.value', '')
      .type('12345');
    cy.get('[data-cy=sign-up-password-error]').contains(
      'Password must be at least 6 characters'
    );
    cy.get('[data-cy=sign-up-password-input]').clear();
    cy.get('[data-cy=sign-up-password-error]').contains('Password is required');
    cy.get('[data-cy=sign-up-password-input]').type(password);
    cy.get('[data-cy=sign-up-password-error]').should('not.exist');

    // check to see if the confirm password matches the password
    cy.get('[data-cy=sign-up-confirm-password-input]')
      .should('have.value', '')
      .type('password');
    cy.get('[data-cy=sign-up-confirm-password-error]').contains(
      'Passwords do not match'
    );
    cy.get('[data-cy=sign-up-confirm-password-input]').clear();
    cy.get('[data-cy=sign-up-confirm-password-error]').contains(
      'Confirm password is required'
    );
    cy.get('[data-cy=sign-up-confirm-password-input]').type(password);
    cy.get('[data-cy=sign-up-confirm-password-error]').should('not.exist');

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
    cy.get('[data-cy=sign-out-button]').click();
    cy.get('[data-cy=sign-out-button]').should('not.exist');
    cy.get('[data-cy=sign-in-button]').should('exist');
    cy.get('[data-cy=sign-up-button]').should('exist');
    cy.get(`[data-cy=username-${username}]`).should('not.exist');
    cy.get('[data-cy=sign-in-button]').click();

    // check for the wrong email
    cy.get('[data-cy=sign-in-email-input]').type(`wrongemail@example.com`);
    cy.get('[data-cy=sign-in-password-input]').type(password);
    cy.get('[data-cy=sign-in-submit-button]').click();
    cy.get('[data-cy=sign-in-loading]');
    cy.get('[data-cy=sign-in-server-error]').contains(
      'Invalid login credentials'
    );
    cy.get('[data-cy=sign-in-email-input]').should('have.value', '');
    cy.get('[data-cy=sign-in-password-input]').should('have.value', '');

    // check the with the wrong password
    cy.get('[data-cy=sign-in-email-input]').type(`${username}@example.com`);
    cy.get('[data-cy=sign-in-password-input]').type('wrongpassword');
    cy.get('[data-cy=sign-in-submit-button]').click();
    cy.get('[data-cy=sign-in-loading]');
    cy.get('[data-cy=sign-in-server-error]').contains(
      'Invalid login credentials'
    );
    cy.get('[data-cy=sign-in-email-input]').should('have.value', '');
    cy.get('[data-cy=sign-in-password-input]').should('have.value', '');

    // check for the correct email and password
    cy.get('[data-cy=sign-in-email-input]').type(`${username}@example.com`);
    cy.get('[data-cy=sign-in-password-input]').type(password);
    cy.get('[data-cy=sign-in-submit-button]').click();
    cy.get('[data-cy=sign-in-loading]');
    cy.get(`[data-cy=user-username-${username}]`).contains(`${username}`);
    cy.get('[data-cy=sign-out-button]').click();
    cy.get('[data-cy=sign-out-button]').should('not.exist');
    cy.get('[data-cy=sign-in-button]').should('exist');
    cy.get('[data-cy=sign-up-button]').should('exist');
    cy.get(`[data-cy=username-${username}]`).should('not.exist');
  });
});
