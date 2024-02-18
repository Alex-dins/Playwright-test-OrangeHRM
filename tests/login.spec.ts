import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../page-objects/loginPage';
import errorLabels from '../test-data/errorLabels.json';

test.describe('Testing login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    
  });

  test.only('Incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const invalidUserName = faker.person.firstName();
    const invalidPassword = faker.internet.password();

    await loginPage.login(invalidUserName, invalidPassword);

    await expect(loginPage.errorAlert).toContainText(
      errorLabels.ERROR_INVALID_CREDENTIALS
    );
  });
});
