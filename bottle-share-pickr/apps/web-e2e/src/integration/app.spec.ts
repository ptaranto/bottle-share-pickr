import { getGreeting } from '../support/app.po';
import each from 'jest-each'

describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome web and api message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to web!');
    getGreeting().contains('Welcome to api!');
  });

  it('should display connect your untappd account when user is not logged in to his untappd account', () =>{
    cy.visit('/');
    cy.contains('Not logged into Unttapd.');
  });

  
  ['CODE', 'abc', '123', 'a1b2c3', 'a877d4a0-8b43-11ea-bc55-0242ac130003', '36d1d169-b2fe-4d2a-ad7e-132eec93a020']
    .forEach((code) => 
      it(`should display code '${code}' provided by untappd via querystring`, () => {
        cy.visit(`/?code=${code}`);
        cy.contains(code);
      })
    );
});
