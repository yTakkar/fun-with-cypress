// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('autoLogin', () => {
  const apiUrl = Cypress.env('apiUrl')

  cy.request({
    method: 'POST',
    url: `${apiUrl}/users/login`,
    failOnStatusCode: false,
    headers: {
      origin: Cypress.config().baseUrl,
      'X-App-Key': Cypress.env('appKey'),
    },
    body: {
      data: {
        username: Cypress.env('username'),
        password: Cypress.env('password')
      },
      metadata: {
        app_version: "",
        autologin_flag: true,
        device: "",
        device_id: "",
        entry_point: "direct",
        session_ptnr: ""
      }
    }
  }).then(response => {
    expect(response.status).to.equal(200)
    const { autologin_token, access_token } = response.body.data
    cy.setCookie('altkn', autologin_token)
    cy.setCookie('actkn', access_token)
  })
})
