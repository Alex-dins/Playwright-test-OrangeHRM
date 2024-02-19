import { type Locator, type Page } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
  }
}
