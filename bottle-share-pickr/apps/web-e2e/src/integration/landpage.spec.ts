describe('Land Page', () => {
  it('CONNECT_TO_UNTAPPD button is displayed', () => {
    cy.visit('/');
    cy.get('a')
      .should('be.visible')
      .contains('Connect to your Untappd account');
  });
});
