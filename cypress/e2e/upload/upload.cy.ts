describe('Upload', () => {
  beforeEach(() => {
    cy.visit('/');
    Cypress.session.clearAllSavedSessions();
  });

  it('should upload songs to ', () => {
    const username = `upload-test-${Math.random()
      .toString(36)
      .substring(2, 10)}`;
    const password = Math.random().toString();

    cy.signUpCustom(username, password);
    cy.get('[data-cy=sidebar-button-upload]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/upload`);
    cy.get('[data-cy=upload-album-title-input]').should('have.value', '');
    cy.get('[data-cy=upload-song-title-input]').should('have.value', '');
    cy.get('[data-cy=upload-song-artist-input]').should('have.value', '');

    cy.get('[data-cy=upload-album-cover]').attachFile('album-cover.jpg');
    cy.get('[data-cy=upload-album-title-input]').type('Upload Test Album');
    cy.get('[data-cy=upload-song-input]').attachFile('song.mp3');
    cy.get('[data-cy="upload-new-artist-list"] > :nth-child(1)')
      .should('have.text', 'New Artist (Rangga Fermata)')
      .click();
    cy.get('[data-cy=upload-song-add-song]').click();

    cy.get('[data-cy=upload-album-title-input]').should('have.text', '');
    cy.get('[data-cy=upload-song-title-input]').should('have.text', '');
    cy.get('[data-cy=upload-song-artist-input]').should('have.text', '');
    cy.get('[data-cy=song-summary-Hurt-text]').should(
      'have.text',
      'Hurt by Rangga Fermata'
    );
    cy.get('[data-cy="upload-song-submit-button"]').click();

    cy.intercept({
      method: 'POST',
      url: '/storage/v1/object/album_covers/**',
    }).as('albumCoverUpload');
    cy.wait('@albumCoverUpload');
    cy.intercept({ method: 'GET', url: '/_next/image?url=**' }).as(
      'uploadSongs'
    );
    cy.wait('@uploadSongs', { timeout: 20000 });
    cy.url().should('not.equal', `${Cypress.config().baseUrl}/upload`);
  });
});
