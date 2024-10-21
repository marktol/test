import { Locator, Page } from "@playwright/test";
import HelperBase from "./helperBase";

export default class NavigationPage extends HelperBase {
  readonly formLayoutsManuItem: Locator;
  readonly datepickerManuItem: Locator;
  readonly smartTableManuItem: Locator;
  readonly toasterManuItem: Locator;
  readonly tooltipManuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.formLayoutsManuItem = page.getByText("Form Layouts");
    this.datepickerManuItem = page.getByText("Datepicker");
    this.smartTableManuItem = page.getByText("Smart Table");
    this.toasterManuItem = page.getByText("Toastr");
    this.tooltipManuItem = page.getByText("Tooltip");
  }

  async formLayoitsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsManuItem.click();

    await this.waitForNumberOfSeconds(1);
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datepickerManuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.smartTableManuItem.click();
  }

  async toasterPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toasterManuItem.click();
  }

  async tootltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipManuItem.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");

    if (expandedState == "false") {
      await groupMenuItem.click();
    }
  }
}
