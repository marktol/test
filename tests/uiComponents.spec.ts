import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }, testInfo) => {
    if (testInfo.retry) {
    }
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test2@test.com");

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    //loc assert
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });

  test("Radio Buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    const radioStatus = usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();

    await expect(usingTheGridForm).toHaveScreenshot({ maxDiffPixels: 250 });

    // expect(radioStatus).toBeTruthy();
    // await expect(
    //   usingTheGridForm.getByRole("radio", { name: "Option 1" })
    // ).toBeChecked();

    // await usingTheGridForm
    //   .getByRole("radio", { name: "Option 2" })
    //   .check({ force: true });

    // expect(
    //   await usingTheGridForm
    //     .getByRole("radio", { name: "Option 1" })
    //     .isChecked()
    // ).toBeFalsy();
    // expect(
    //   await usingTheGridForm
    //     .getByRole("radio", { name: "Option 2" })
    //     .isChecked()
    // ).toBeTruthy();
  });
});

test("Checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  const allBoxes = page.getByRole("checkbox");
  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test("dropdown", async ({ page }) => {
  const dropDownManu = page.locator("ngx-header nb-select");
  await dropDownManu.click();

  page.getByRole("list"); //if list have a UL tag
  //   page.getByRole("listitem"); // when LI

  // const optionList = page.getByRole('list').locator('nb-option')
  const optionList = page.locator("nb-option-list nb-option");

  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  await optionList.filter({ hasText: "Cosmic" }).click();

  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  for (let color in colors) {
    await dropDownManu.click();
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
  }
});

test("tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  await tooltipCard.getByRole("button", { name: "Top" }).hover();

  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
});

test("dialog box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();
  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});

test("web tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  // await targetRow.locator(".nb-edit").click();
  // await page.locator("input-editor").getByPlaceholder("Age").clear();
  // await page.locator("input-editor").getByPlaceholder("Age").fill("35");
  // await page.locator(".nb-checkmark").click();

  // await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  // const tergetRowById = page
  //   .getByRole("row", { name: "11" })
  //   .filter({ has: page.locator("td").nth(1).getByText("11") });
  // await tergetRowById.locator(".nb-edit").click();
  // await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  // await page
  //   .locator("input-editor")
  //   .getByPlaceholder("E-mail")
  //   .fill("test@test.com");
  // await page.locator(".nb-checkmark").click();
  // await expect(tergetRowById.locator("td").nth(5)).toHaveText("test@test.com");

  //3 filter of the table
  const ages = ["20", "30", "40", "200"];

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator("tbody tr");

    for (let row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();

      age == "200"
        ? expect(await page.getByRole("table").textContent()).toContain(
            "No data found"
          )
        : expect(cellValue).toEqual(age);
    }
  }
});

test("datapicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const inputField = page.getByPlaceholder("Form Picker");
  await inputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 100);

  const expectedDate = date.getDate().toString();
  const expMonthshort = date.toLocaleString("En-US", { month: "short" });
  const expMonthsLong = date.toLocaleString("En-US", { month: "long" });
  const expYear = date.getFullYear().toString();
  const dateToAssert = `${expMonthshort} ${expectedDate}, ${expYear}`;

  let calendarMaY = await page.locator("nb-calendar-view-mode").textContent();
  const expectedMaY = `${expMonthsLong} ${expYear}`;

  while (!calendarMaY.includes(expectedMaY)) {
    await page.locator(".next-month").click();
    calendarMaY = await page.locator("nb-calendar-view-mode").textContent();
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();
  await expect(inputField).toHaveValue(dateToAssert);
});

test("sliders", async ({ page }) => {
  // const tempGauge = page.locator('[tabtitle="Temperature"] circle');
  // await tempGauge.evaluate((node) => {
  //   node.setAttribute("cx", "232.63");
  //   node.setAttribute("cy", "232.63");
  // });
  // await tempGauge.click();

  //mouse movement
  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger'
  );
  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();
  await expect(tempBox).toContainText("30");
});
