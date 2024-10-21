import { Page, expect } from "@playwright/test";
import HelperBase from "./helperBase";

export default class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async selectCommonDatePickerDateFromToday(namberOfDaysFormToday: number) {
    const inputField = this.page.getByPlaceholder("Form Picker");
    await inputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      namberOfDaysFormToday
    );
    await expect(inputField).toHaveValue(dateToAssert);
  }

  async selectDatePickerWithRange(startDay: number, endDay: number) {
    const inputField = this.page.getByPlaceholder("Range Picker");
    await inputField.click();

    const dateToAssertStart = await this.selectDateInTheCalendar(startDay);
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDay);

    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
    await expect(inputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(namberOfDaysFormToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + namberOfDaysFormToday);

    const expectedDate = date.getDate().toString();
    const expMonthshort = date.toLocaleString("En-US", { month: "short" });
    const expMonthsLong = date.toLocaleString("En-US", { month: "long" });
    const expYear = date.getFullYear().toString();
    const dateToAssert = `${expMonthshort} ${expectedDate}, ${expYear}`;

    let calendarMaY = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMaY = `${expMonthsLong} ${expYear}`;

    while (!calendarMaY.includes(expectedMaY)) {
      await this.page.locator(".next-month").click();
      calendarMaY = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert;
  }
}
