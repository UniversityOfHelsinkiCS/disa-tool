import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080/');
});

test('Test adding a task', async ({ page }) => {
  await page.goto('http://localhost:8080/course/1');
  await page.getByRole('link', { name: 'Tehtävät' }).click();
  await page.getByTestId('add-button').click();
  await page.locator('div').filter({ hasText: /^NimiYksikielinenMonikielinenenglishsuomisvenska$/ }).getByRole('textbox').click()
  await page.locator('div').filter({ hasText: /^NimiYksikielinenMonikielinenenglishsuomisvenska$/ }).getByRole('textbox').fill('Tärkeä tehtävä');


  await page.locator('div').filter({ hasText: /^kuvausYksikielinenMonikielinenenglishsuomisvenska$/ }).getByRole('textbox').click()
  await page.locator('div').filter({ hasText: /^kuvausYksikielinenMonikielinenenglishsuomisvenska$/ }).getByRole('textbox').fill('Tehkää tehtävä');

  await page.locator('input[name="info"]').click()
  await page.locator('input[name="info"]').fill('Tehtävä ei ole vaikea');
  await page.locator('input[name="points"]').click()
  await page.locator('input[name="points"]').fill('1');
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot("form-filled.png")


  await page.getByRole('button', { name: 'course.tasks.save' }).click();

   expect(page.getByTestId('course-page').getByRole('alert').getByText('Tärkeä tehtävä')).toBeTruthy()
   expect(page.getByTestId('course-page').locator('div').filter({ hasText: 'Tärkeä tehtäväReverse-engineered stable solutionEnhanced directional circuitUniv' }).first()).toBeTruthy()
   expect(page.getByText('Tehtävän lisätiedot: Tehtävän info')).toBeTruthy()
   expect(page.getByText('Maksimipisteet: 1')).toBeTruthy()
   await page.waitForTimeout(200)
   await expect(page).toHaveScreenshot("task-added.png")
});