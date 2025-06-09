# REQUIRED IN EVERY TEST FILE TO START RUNNING TESTS. tHEY ARE USED TO IMPORT LIBRARIES.
#
# driver.get("https://google.com")
# googleSearchBox  = driver.find_element(By.ID, "APjFqb")
# googleSearchBox.send_keys("What the fuck is even selenium? Never!!")
# googleSearchBox.send_keys(Keys.RETURN)
# googleSearchButton = driver.find_element(By.CLASS_NAME, "gNO89b")
# googleSearchButton.click()
# time.sleep(10)
# driver.close()
# driver.quit()

# driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
#
# time.sleep(5)
# username_textbox = driver.find_element(By.NAME, "username")
# password_textbox = driver.find_element(By.NAME, "password")
# login_button = driver.find_element(By.XPATH, "/html/body/div/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button")

# driver.find_element(By.NAME, "username").send_keys("Admin")
# driver.find_element(By.NAME, "password").send_keys("admin123")
# driver.find_element(By.XPATH, "/html/body/div/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button").click()
# login_button.click()
# driver.find_element(By.NAME, "username").click()
# driver.find_element(By.NAME, "password").send_keys("admin123")
# driver.find_element(By.XPATH, "driver.find_element(By.NAME, "username").click()").click()
# time.sleep(2)


# Parametrization
#
# @pytest.mark.parametrize("username, password", [
#     ("Admin", "admin123"),
#     ("Tolu", "admin123"),
#     ("Admin", "12345678"),
#     ("Tolu", "12345678"),
# ])

# Fixtures
#
# @pytest.fixture()
# def driver():
#     driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
#     driver.implicitly_wait(10)
#     yield driver
#     driver.close()
#     driver.quit()