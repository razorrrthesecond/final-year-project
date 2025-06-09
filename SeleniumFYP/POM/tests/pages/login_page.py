from selenium.webdriver.common.by import By


class LoginPage:

    def __init__(self, driver):
        self.driver = driver
        self.username_textbox = (By.NAME, "username")
        self.password_textbox = (By.NAME, "password")
        self.login_button = (By.XPATH, "/html/body/div/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button")

    def open_page(self, url):
        self.driver.get(url)

    def login_details(self, username, password):
        self.driver.find_element(*self.username_textbox).send_keys(username)
        self.driver.find_element(*self.password_textbox).send_keys(password)
        self.driver.find_element(*self.login_button).click()