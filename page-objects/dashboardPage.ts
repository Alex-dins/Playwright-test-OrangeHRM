import { type Locator, type Page } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  readonly topBarHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topBarHeader = page.getByRole('heading', { name: 'Dashboard' });
  }
}
