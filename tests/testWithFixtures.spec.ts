import { test } from "../test-options";
import { faker } from "@faker-js/faker";

test("params meth", async ({ pageManager }) => {
  const fullRandomName = faker.person.fullName();
  const randomEmail = `${fullRandomName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  await pageManager
    .onFormLayouts()
    .submiteUsingTheGridForm(randomEmail, "HAHAHAHAH", "Option 1");
  await pageManager
    .onFormLayouts()
    .submitInLineForm(fullRandomName, randomEmail, true);
});
