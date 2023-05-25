export const getGreeting = (): Cypress.Chainable<JQuery<HTMLHeadingElement>> => {
  return cy.get('h1');
};
