/// <reference types="cypress" />

context('Login', () => {
  it('should goto login page', () => {
    cy.visit('/login')
  })

  it('should display error messages when fields are empty', () => {
    cy.get('input[type="email"]').type(' {enter}')
    cy
      .get('#email-helper-text')
      .should('have.text', 'Enter a valid Mobile Number or Email ID')

    cy
      .get('#password-helper-text')
      .should('have.text', 'Password should have 4 to 20 characters without any spaces')
  })

  it('should enter correct credentials', () => {
    cy
      .get('input[type="email"]')
      .type('faiyaz.s@peopleinteractive.in')

    cy
      .get('input[type="password"]')
      .type('0303{enter}')
  })

  it('API call should be successful', () => {
    cy.server()
    const apiUrl = Cypress.env('apiUrl')
    cy.route('POST', `${apiUrl}/users/login`).as('login')
    cy.wait('@login').then(response => {
      console.log(response)
      expect(response.status).to.equal(200)
    })
  })

  it('should goto matches page after successfully login', () => {
    cy.wait(2000).url().should('contain', `/profiles/unviewed-matches`)
  })
})
