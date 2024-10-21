import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL);
  await page.getByText("Button Triggering AJAX Request").click();
});

test("auto", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  //   await successButton.click();
  //   const text = await successButton.textContent();
  //   await successButton.waitFor({ state: "attached" });
  //   const text = await successButton.allTextContents();
  //   expect(text).toContain("Data loaded with AJAX get request.");

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test("alt waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // wait for element
  await page.waitForSelector(".bg-success");

  // wait for response
  // await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});
