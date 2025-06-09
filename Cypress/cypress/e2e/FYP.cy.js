import { LoginPage } from "./pages/login_page"

const loginpage = new LoginPage()


beforeEach(function () {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
})
describe('All Login tests', () => {
  it('Successful Login', () => {
    loginpage.userLogin('Admin', 'admin123')
    cy.wait(3000)
    cy.url().should('include', '/dashboard')
  })

  it('Invalid Password', () => {
    loginpage.userLogin('Admin', 'admin23')
    cy.contains('Invalid credentials').should('exist')
  })

  it('Invalid Username', () => {
    loginpage.userLogin('Amin', 'admin123')
    cy.contains('Invalid credentials').should('exist')
  })

  it('Invalid Username and Password', () => {
    loginpage.userLogin('Amin', 'admin23')
    cy.contains('Invalid credentials').should('exist')
  })

  it('Invalid login with no credentials', () => {
    cy.get('.oxd-button').click() //Login button
    cy.contains('Required').should('exist')
  })
})

it('Log out', () => {
  loginpage.userLogin('Admin', 'admin123')
  cy.get('.oxd-userdropdown-tab').click() //User dropdown menu
  cy.wait(800)
  cy.get(':nth-child(4) > .oxd-userdropdown-link').click() //Log out button
}) //Might need to remove this test case

it('Add Employees', () => {
  loginpage.userLogin('Admin', 'admin123')
  cy.contains('PIM').click()
  cy.get('.orangehrm-header-container > .oxd-button').click()
  cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type('John')
  cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').type('JD')
  cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type('Doe')
  cy.get('.oxd-file-div > .oxd-icon-button > .oxd-icon')
    .click({ force: true })

  cy.get('input[type="file"]').selectFile('cypress/fixtures/JohnDoe.jpg', { force: true })
  cy.get('.oxd-button--secondary').click()

})

it('Password reset', () => {
  cy.get('.orangehrm-login-forgot > .oxd-text').click() //Forgot your password link
  cy.get('.oxd-input').type('Admin') //Username password
  cy.get('.oxd-button--secondary').click() //Reset password button
})

it('Search for a user', () => {
  loginpage.userLogin('Admin', 'admin123')
  cy.get(':nth-child(1) > .oxd-main-menu-item').click() //Admin button
  cy.get(':nth-child(2) > .oxd-input').type('FMLName') //Search textbox
  cy.get('.oxd-form-actions > .oxd-button--secondary').click() //Search button
  // cy.contains('Record Found').should('exist')
})

it('Delete a User', () => {
  loginpage.userLogin('Admin', 'admin123')
  cy.get(':nth-child(1) > .oxd-main-menu-item').click() //Admin button
  cy.get(':nth-child(4) > .oxd-table-row > :nth-child(6) > .oxd-table-cell-actions > :nth-child(1)').click() //Delete button
  cy.get('.oxd-button--label-danger').click() //Confirm delete button
})


