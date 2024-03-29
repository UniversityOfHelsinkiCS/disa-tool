import { test, expect } from '@playwright/test'

test('Individual task renders correctly', async ({ page }) => {
  await page.goto('http://localhost:8080/course/1')
  await page.getByRole('link', { name: 'Tehtävät' }).click()
  await page.getByTestId('course-page').getByRole('textbox').click()
  await page.getByTestId('course-page').getByRole('textbox').fill('Tehtävä')
  await page.getByRole('option', { name: 'Tehtävä 1. (Tee voltti)' }).click()
  await expect(page.getByText('Tehtävä 1. (Tee voltti)').nth(2)).toBeVisible()
  await expect(
    page.getByText('Tässä tehtävässä sinun tulee tehdä voltti, eli hypätä ja pyörähtää täysi kierros'),
  ).toBeVisible()
  await expect(page.getByText('Maksimipisteet: 3')).toBeVisible()
  await expect(page.getByText('Oletusarvoinen kerroin: 0.14')).toBeVisible()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('task.png')
  await page.getByRole('button', { name: 'Muokkaa tehtävää' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('edit-task.png')
  await page.getByRole('button', { name: 'cancel' }).click()
  await page.getByRole('button', { name: 'Muokkaa kertoimia' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('edit-task-multiplier.png')
  await page.getByRole('button', { name: 'Peru' }).click()
  await page.getByText('Matriisi', { exact: true }).nth(1).click()
  await expect(page).toHaveScreenshot('task-matrix.png')
})
