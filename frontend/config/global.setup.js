import { test as setup } from '@playwright/test';
import { STORAGE_STATE } from './playwright.config';

setup('do login', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('kimgjun');
    await page.getByRole('textbox').press('Enter');

  await page.context().storageState({ path: STORAGE_STATE });
});

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('kimgjun');
  await page.getByRole('textbox').press('Enter');

  await page.context().storageState({ path: storageState });
  await browser.close();
}

export default globalSetup;