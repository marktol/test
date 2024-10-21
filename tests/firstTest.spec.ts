import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  //by Tag name
  page.locator("input");

  //by ID
  await page.locator("#inputEmail1").click();

  //class value
  page.locator(".shape-rectangle");

  //attribute
  page.locator('[placeholder="Email"]');

  //combine values
  page.locator('input[placeholder="Email"]');

  //by partial text match
  page.locator(':text("Using")');

  //exact text
  page.locator(':text-is("Using the Grid")');
});

test("user facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  // await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText("Block form").click();

  await page.getByTitle("IoT Dashboard").click();
});

test("locating test children", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 1")')
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  await page.locator("nb-card").getByRole("button").first().click();
});

test("parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the grid" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });
  const emailfield = basicForm.getByRole("textbox", { name: "Email" });

  await emailfield.fill("test@test.com");
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.getByRole("button").click();

  await expect(emailfield).toHaveValue("test@test.com");
});

test("qq", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });
  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toEqual("Submit");

  const allRadioButtonsLables = await page
    .locator("nb-radio")
    .allTextContents();
  expect(allRadioButtonsLables).toContain("Option 1");

  //input value
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@test.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual("test@test.com");

  //
  const placeholderValue = await emailField.getAttribute("placeholder");
  expect(placeholderValue).toEqual("Email");
});

test("assertions", async ({ page }) => {
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" })
    .locator("button");

  //general assertion
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  //locator assertion
  await expect(basicFormButton).toHaveText("Submit");

  //Soft assertion
  await expect.soft(basicFormButton).toHaveText("Submit");
  await basicFormButton.click();
});
