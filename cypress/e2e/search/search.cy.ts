describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
    Cypress.session.clearAllSavedSessions();
  });

  it('should search for a song, play it from the search page, and play it on the album page', () => {
    cy.get('[data-cy=sidebar-button-search]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/search`);

    cy.get('[data-cy=search-page-input]').type('Hurt');

    cy.get('[data-cy=song-card-album-cover-1]').click();
    cy.get('[data-cy=now-playing-song-name]').should('have.text', 'Hurt');
    cy.get('[data-cy=now-playing-artist-name]').should(
      'have.text',
      'Rangga Fermata'
    );

    cy.get('[data-cy=song-card-album-cover-1]').click();
    cy.get('[data-cy=now-playing-song-name]').should('have.text', 'Hurt');
    cy.get('[data-cy=now-playing-artist-name]').should(
      'have.text',
      'Rangga Fermata'
    );

    cy.get('[data-cy=song-card-song-name-1]').should('have.text', 'Hurt');
    cy.get('[data-cy=song-card-artist-name-1]').should(
      'have.text',
      'Rangga Fermata'
    );

    cy.get('[data-cy=song-card-song-name-1]')
      .should('have.text', 'Hurt')
      .click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/album/1`);

    cy.get('[data-cy=now-playing-song-name]').should('have.text', 'Hurt');

    cy.get('[data-cy=song-list-item-album-number-1]')
      .should('have.text', '1')
      .click();
  });
});
