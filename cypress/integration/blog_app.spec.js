describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'Mika Vahlberg',
      username: 'root',
      password: 'String'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('String')
      cy.get('#login-button').click()
      cy.contains('Mika Vahlberg logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('credentials')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })
})