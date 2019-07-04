/// <reference types="cypress" />

const a = 1;

context("Dashboard", () => {
  before(() => {
    cy.autoLogin();
  })

  it('should visit /dashboard', () => {
    cy.visit('/home')
  })

  it('/edit-profile link', () => {
    cy.get('a[href="/preview-profile"]')
      .should('have.text', 'Edit Profile')
      .click()
      .url()
      .should('contain', '/preview-profile')
      .go('back')
  })

  it('/edit-partner-preferences link', () => {
    cy.get('a[href="/edit-partner-preferences"]')
      .should('have.text', 'Edit Preferences')
      .click()
      .url()
      .should('contain', '/edit-partner-preferences')
      .go('back')
  })
})
