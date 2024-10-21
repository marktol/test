import { test } from "@playwright/test";
import PageManager from "../src/page-objects/pageManeger";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("navigate to form page @smoke", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoitsPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toasterPage();
  await pm.navigateTo().tootltipPage();
});

test("params meth", async ({ page }) => {
  const pm = new PageManager(page);

  const fullRandomName = faker.person.fullName();
  const randomEmail = `${fullRandomName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  await pm.navigateTo().formLayoitsPage();
  await pm
    .onFormLayouts()
    .submiteUsingTheGridForm(randomEmail, "HAHAHAHAH", "Option 1");

  await page.screenshot({ path: "screenshots/formLayoutsPage.png" });
  const buffer = await page.screenshot();

  await pm.onFormLayouts().submitInLineForm(fullRandomName, randomEmail, true);
  await page
    .locator("nb-card", { hasText: "Inline form" })
    .screenshot({ path: "screenshots/formLayoutsPage1.png" });
  await pm.navigateTo().datepickerPage();
  await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5);
  await pm.onDatePickerPage().selectDatePickerWithRange(3, 5);
});

test.only("testing with arfos ci", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoitsPage();
  await pm.navigateTo().datepickerPage();
});
