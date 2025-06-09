class LoginPage {

    constructor(page) {
        this.page = page
        this.username_textbox = page.getByRole('textbox', { name: 'Username' })
        this.password_textbox = page.getByRole('textbox', { name: 'Password' })
        this.login_button = page.getByRole('button', { name: 'Login' })
    }
    
    async goToLoginPage(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    async userLogin(username, password){
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.login_button.click()
    }
}

module.exports = { LoginPage };