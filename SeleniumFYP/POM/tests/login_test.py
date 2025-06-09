import time

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from POM.tests.pages.login_page import LoginPage
from pynput.keyboard import Key, Controller

@pytest.fixture()
def driver():
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.implicitly_wait(10)
    yield driver
    driver.close()
    driver.quit()

#Valid login
def test_login(driver):
    login_page = LoginPage(driver)

    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Admin", "admin123")
    current_url = driver.current_url
    # Assertion that we have been redirected to the url containing dashboard
    assert "dashboard" in current_url

#Invalid login with invalid password
def test_login2(driver):
    login_page = LoginPage(driver)

    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Admin", "12345")
    #Assert that Invalid Credentials is on the webpage
    elements = driver.find_elements(By.CSS_SELECTOR, ".oxd-alert-content-text")
    assert len(elements) > 0

#Inavlid login with invalid username
def test_login3(driver):
    login_page = LoginPage(driver)

    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Tolu", "admin123")
    # Assert that Invalid Credentials is on the webpage
    elements = driver.find_elements(By.CSS_SELECTOR, ".oxd-alert-content-text")
    assert len(elements) > 0

#Invalid login with invalid username and password
def test_login4(driver):
    login_page = LoginPage(driver)

    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Tolu", "12345")
    # Assert that Invalid Credentials is on the webpage
    elements = driver.find_elements(By.CSS_SELECTOR, ".oxd-alert-content-text")
    assert len(elements) > 0

#Invalid login with no credentials
def test_login5(driver):
    login_page = LoginPage(driver)

    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    driver.find_element(By.XPATH, "/html/body/div/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button").click()
    # Assert that Required is on the webpage
    elements = driver.find_elements(By.CSS_SELECTOR, ".oxd-form-row:nth-child(3) .oxd-text")
    assert len(elements) > 0

#Log out
def test_logout(driver):
    login_page = LoginPage(driver)

    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Admin", "admin123")
    driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p").click()
    driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a").click()
    current_url = driver.current_url
    # Assertion that we have been redirected to the url containing login
    assert "login" in current_url

#Reset password
def test_reset_password(driver):
    login_page = LoginPage(driver)
    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    forgot_password_link = driver.find_element(By.XPATH, "/html/body/div/div[1]/div/div[1]/div/div[2]/div[2]/form/div[4]/p")
    forgot_password_link.click()
    forgot_password_username = driver.find_element(By.NAME, "username")
    forgot_password_username.send_keys("Admin")
    reset_password_button = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/div/form/div[2]/button[2]")
    reset_password_button.click()

#Search for a user
def test_search_user(driver):
    login_page = LoginPage(driver)
    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Admin", "admin123")
    admin_button = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a/span")
    admin_button.click()
    search_user_textbox = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input")
    search_user_textbox.send_keys("FMLName")
    search_button = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]")
    search_button.click()

#Delete a user
def test_delete_user(driver):
    login_page = LoginPage(driver)
    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Admin", "admin123")
    admin_button = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a/span")
    admin_button.click()
    driver.find_element(By.CSS_SELECTOR, ".oxd-table-card:nth-child(1) .oxd-icon-button:nth-child(1) > .oxd-icon").click()
    driver.find_element(By.CSS_SELECTOR, ".oxd-button--label-danger").click()

#Add an employee
def test_add_employee(driver):
    login_page = LoginPage(driver)

    login_page.open_page("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    login_page.login_details("Admin", "admin123")
    driver.find_element(By.LINK_TEXT, "PIM").click()
    driver.find_element(By.CSS_SELECTOR, ".oxd-button--secondary:nth-child(1)").click() #Add button
    driver.find_element(By.NAME, "firstName").send_keys("John")
    driver.find_element(By.NAME, "middleName").send_keys("JD")
    driver.find_element(By.NAME, "lastName").send_keys("Doe")
    driver.find_element(By.CSS_SELECTOR, ".oxd-icon-button--solid-main").click() #Image add button
    time.sleep(3)

    keyboard = Controller()

    keyboard.type("C:\\Users\\omobo\\Desktop\\fyp\\SeleniumFYP\\fixtures\\JohnDoe.jpg")
    time.sleep(3) #Necessary for test completion
    keyboard.press(Key.enter)
    keyboard.release(Key.enter)
    driver.find_element(By.CSS_SELECTOR, ".oxd-button--secondary").click()
    time.sleep(3)