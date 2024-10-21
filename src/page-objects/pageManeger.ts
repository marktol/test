import { Page } from "@playwright/test";
import NavigationPage from "../page-objects/navigationPage";
import FormLayotsPage from "../page-objects/formLayoutsPage";
import DatepickerPage from "../page-objects/datePicker";

export default class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayotsPage: FormLayotsPage;
  private readonly datepickerPage: DatepickerPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayotsPage = new FormLayotsPage(this.page);
    this.datepickerPage = new DatepickerPage(this.page);
  }
  navigateTo() {
    return this.navigationPage;
  }
  onFormLayouts() {
    return this.formLayotsPage;
  }

  onDatePickerPage() {
    return this.datepickerPage;
  }
}
