describe('Contact Page E2E Test', () => {
  it('successfully fills out the contact form and submits', () => {
    cy.visit('http://localhost:5173/contact');

    cy.contains('CONTACT ME').should('be.visible');

    cy.get('input[name="firstName"]').type('Cypress');
    cy.get('input[name="lastName"]').type('Test');
    cy.get('input[name="contact"]').type('123-456-7890');
    cy.get('input[name="email"]').type('cypress_test@example.com');
    cy.get('textarea[name="message"]').type('This is an automated E2E test message.');

    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/contact');
  });
});