import { test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../../../config/playwright.config';

setup('do login', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('kimgjon');
    await page.getByRole('textbox').press('Enter');

  await page.context().storageState({ path: STORAGE_STATE });
});