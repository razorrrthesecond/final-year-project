import {LoginPage} from "./pages/login_page"

const loginpage = new LoginPage()


beforeEach(function(){
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
} )
  describe('All Login tests', () => {
    it('Successful Login', () => {
        loginpage.userLogin('Admin', 'admin123')
        cy.wait(3000)
      })
    
      it('Invalid Password', () => {
        loginpage.userLogin('Admin', 'admin23')
      })
    
      it('Invalid Username', () => {
        loginpage.userLogin('Amin', 'admin123')
      })
    
      it('Invalid Username and Password', () => {
        loginpage.userLogin('Amin', 'admin23')
      })
  })

  it('Add Employees', () => {
    loginpage.userLogin('Admin', 'admin123')
    cy.contains('PIM').click()
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type('John')
    cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').type('JD')
    cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type('Doe')
    cy.get('.oxd-file-div > .oxd-icon-button > .oxd-icon')
    .click({force: true})
    
    cy.get('input[type="file"]').selectFile('cypress/fixtures/JohnDoe.jpg', {force: true})

  })

  it.only('Leave Application', () => {
    loginpage.userLogin('Admin', 'admin123')
    // cy.contains('Leave').click()
    // cy.contains('Apply').click()
    cy.scrollTo('500px')
  })

  it('Testing Git Repo', () => {
    loginpage.userLogin('Admin','admin123')
  })

  it('Invalid Password', () => {
    cy.visit
        loginpage.userLogin('Admin', 'admin23')
      })
