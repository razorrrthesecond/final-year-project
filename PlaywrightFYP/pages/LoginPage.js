export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goToLoginPage() {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    async userLogin(username, password) {
        await this.username_textbox.fill();
        await this.password_textbox.fill();
        await this.login_button.click();
    }

}
