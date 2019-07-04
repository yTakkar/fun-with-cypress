/// <reference types="cypress">

context('Home', () => {
  beforeEach(() => {
    cy.viewport(360, 500)
  })

  it('should go to /', () => {
    cy.visit('/')
  })

  it('regForm should be in the viewport', () => {
    cy.get('#regForm').should('be.visible')
  })
})