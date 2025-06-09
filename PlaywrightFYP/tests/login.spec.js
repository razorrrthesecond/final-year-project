const { test, expect } = require('@playwright/test');

import { LoginPage } from '../pages/loginPOM'

test.describe('All Login tests', () => {
  test('Valid Login', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.goToLoginPage()
    await Login.userLogin('Admin', 'admin123')
    await expect(page).toHaveURL(/.*dashboard.*/);
  });

  test('Invalid login with invalid username', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.goToLoginPage()
    await Login.userLogin('Tolu', 'admin123')
    await expect(page.locator('body')).toContainText('Invalid credentials');
  });

  test('Invalid login with invalid password', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.goToLoginPage()
    await Login.userLogin('Admin', '12345')
    await expect(page.locator('body')).toContainText('Invalid credentials');
  });

  test('Invalid login with invalid username and password', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.goToLoginPage()
    await Login.userLogin('Tolu', '12345')
    await expect(page.locator('body')).toContainText('Invalid credentials');
  });
  test('Invalid login with no credentials', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.goToLoginPage()
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.locator('body')).toContainText('Required');
  });

})

test('Reset Password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByText('Forgot your password?').click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('button', { name: 'Reset Password' }).click();
  await expect(page.locator('body')).toContainText('Reset Password link sent successfully')
});

test('Log out', async ({ page }) => {
  const Login = new LoginPage(page)
  await Login.goToLoginPage()
  await Login.userLogin('Admin', 'admin123')
  await page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});

test('Add a new employee', async ({ page }) => {
  const Login = new LoginPage(page)
  await Login.goToLoginPage()
  await Login.userLogin('Admin', 'admin123')
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('John');
  await page.getByRole('textbox', { name: 'Middle Name' }).fill('JD');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
  await page.getByRole('button', { name: '' }).click();
  await page.locator('input[type="file"]').setInputFiles('fixtures/JohnDoe.jpg');
  await page.getByRole('button', { name: 'Save' }).click();
})

test('Search for a user', async ({ page }) => {
  const Login = new LoginPage(page)
  await Login.goToLoginPage()
  await Login.userLogin('Admin', 'admin123')
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('FMLName');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('body')).toContainText('Record Found')
})

test('Delete user', async ({ page }) => {
  const Login = new LoginPage(page)
  await Login.goToLoginPage()
  await Login.userLogin('Admin', 'admin123')
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.pause()
  const usernameToBeDeleted = page.getByRole('row', { name: ' FMLName1 ESS FName LName' });
  if (await usernameToBeDeleted.isVisible()) {
    await usernameToBeDeleted.click();
    await page.getByRole('button', { name: ' Yes, Delete' }).click();
  } else {
  }
})





