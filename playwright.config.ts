import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  retries: 1,
  reporter: "html",

  use: {
    globalQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    baseURL: "http://localhost:4200/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },
    {
      name: "chromium",
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObj.spec.ts",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: { ...devices["iPhone 13 Pro"] },
    },
  ],
  webServer: { command: "npm run start", url: "http://localhost:4200/" },
});
