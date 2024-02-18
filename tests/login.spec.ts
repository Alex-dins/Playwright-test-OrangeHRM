import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../page-objects/loginPage';
import { Dashboard } from '../page-objects/dashboardPage';
import errorLabels from '../test-data/errorLabels.json';
import dashboardData from '../test-data/dashboardData.json';

test.describe('Testing login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new Dashboard(page);

    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

    await expect(dashboard.topBarHeader).toContainText(
      dashboardData.MAIN_NEADER
    );
  });

  test('Incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const invalidUserName = faker.person.firstName();
    const invalidPassword = faker.internet.password();

    await loginPage.login(invalidUserName, invalidPassword);

    await expect(loginPage.errorAlert).toContainText(
      errorLabels.ERROR_INVALID_CREDENTIALS
    );
  });
});
