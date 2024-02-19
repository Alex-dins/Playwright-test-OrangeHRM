import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { Dashboard } from '../page-objects/dashboardPage';
import errorLabels from '../test-data/errorLabels.json';
import dashboardData from '../test-data/dashboardData.json';
import { generateFakeUser } from '../helper/fakeUser';

test.describe('Testing login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new Dashboard(page);

    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

    await expect(dashboard.dashboardHeader).toContainText(
      dashboardData.MAIN_HEADER
    );
  });

  test('Incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const fakeUser = generateFakeUser();

    await loginPage.login(fakeUser.username, fakeUser.password);

    await expect(loginPage.errorAlert).toContainText(
      errorLabels.ERROR_INVALID_CREDENTIALS
    );
  });

  test('Empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginButton.click();
    await expect(loginPage.usernameInputFieldErrorMessage).toHaveText(
      errorLabels.ERROR_LABEL_EMPTY_FIELD
    );
    await expect(loginPage.passwordInputFieldErrorMessage).toHaveText(
      errorLabels.ERROR_LABEL_EMPTY_FIELD
    );
  });
});
