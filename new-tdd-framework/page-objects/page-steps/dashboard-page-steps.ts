import { Page, expect } from '@playwright/test';
import dashboardPage from '../page-elements/dashboard-page-elements.json' with { type: 'json' };
import { WebCommons } from '../../commons/ui/web-commons.ts';

export class DashboardPageSteps {
  page: Page;
  web: WebCommons;

  constructor(page: Page) {
    this.page = page;
    this.web = new WebCommons(this.page);
  }

  async verifyDashboardIsDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard/i);
    await this.web.isElementVisible(dashboardPage.dashboardBreadcrumb);
    const crumb = await this.web.getElementText(
      dashboardPage.dashboardBreadcrumb,
    );
    await this.web.compareText(crumb, 'Dashboard');
  }

  async verifyUserMenuIsDisplayed(): Promise<void> {
    await this.web.isElementVisible(dashboardPage.userDropdown);
  }
}
