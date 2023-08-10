import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080/');
});

test.describe("Course page", () => {

test('Renders matrix page', async ({ page }) => {
  await page.goto('http://localhost:8080/course/1');
  const courseHeader = page.locator('id=course-header')
  await expect(page.getByRole('cell', { name: 'taitotasot' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'osio' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Yhtälöryhmät' })).toBeVisible()
  await expect(page.getByText('Osaan muokata yhtälöryhmää vastaavan matriisin alkeisrivitoimituksilla redusoidu')).toBeVisible()
  await expect(page.getByTestId('matrix-table').locator('div').filter({ hasText: '1-2' }).nth(2)).toBeVisible()
  await expect(courseHeader).toHaveText('Lineaarialgebra ja matriisilaskenta I kevät 2018')
  await page.waitForLoadState('domcontentloaded')
  await expect(page).toHaveScreenshot();
})

test('Shows loading bar on wrong url', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('kimgjon');
  await page.getByRole('textbox').press('Enter');
  await page.goto('http://localhost:8080/course/1337');
  const loadingIcon =  page.locator('id=loading-icon')
   expect(loadingIcon).toBeTruthy();
  await page.waitForLoadState('domcontentloaded')
  await expect(page).toHaveScreenshot();
})

})