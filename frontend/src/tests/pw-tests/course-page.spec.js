import { test, expect } from '@playwright/test';


test.describe("Course page", () => {

test('Renders matrix page', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('kimgjun');
  await page.getByRole('textbox').press('Enter');
  await page.goto('http://localhost:8080/course/1');
  const courseHeader = page.locator('id=course-header')
  await expect(courseHeader).toHaveText('Lineaarialgebra ja matriisilaskenta I kevät 2018')
  await expect(page).toHaveScreenshot();
})

test('Shows loading bar on wrong url', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('kimgjun');
  await page.getByRole('textbox').press('Enter');
  await page.goto('http://localhost:8080/course/1337');
  const loadingIcon =  page.locator('id=loading-icon')
   expect(loadingIcon).toBeTruthy();
  await expect(page).toHaveScreenshot();
})

})