import { getGreeting } from '../support/app.po';

describe('web', () => {
  describe('landing page without authentication', () => {
    it('should display connect your untappd account when user is not logged in to his untappd account', () => {
      cy.visit('/');
      cy.contains('Connect to your Untappd account');
    });
  });

  describe('landing page after being redirecetd by Untappd authentication', () => {
    [
      'CODE',
      'abc',
      123,
      'a1b2c3',
      'a877d4a0-8b43-11ea-bc55-0242ac130003',
      '36d1d169-b2fe-4d2a-ad7e-132eec93a020'
    ].forEach(code =>
      it(`should display code '${code}' provided by untappd via querystring`, () => {
        cy.visit(`/auth?code=${code}`);
        cy.get('strong').contains(code);
      })
    );
  });
});
