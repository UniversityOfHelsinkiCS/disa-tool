import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080/')
})

test.describe('Task', () => {
  test('Check that EditTaskTab renders', async ({ page }) => {
    await page.goto('http://localhost:8080/course/1')
    await page.goto('http://localhost:8080/course/1/matrix')
    await page.getByRole('link', { name: 'Tehtävät' }).click()
    await page
      .locator('div')
      .filter({ hasText: /^Types$/ })
      .nth(3)
      .click()
    // Edit field shows
    await page.waitForTimeout(200)
    await expect(page).toHaveScreenshot('edit-field-expanded.png')
    await page
      .locator('div')
      .filter({ hasText: /^Types$/ })
      .first()
      .click()
    // Edit field collapses
    await page.waitForTimeout(200)
    await expect(page).toHaveScreenshot('edit-field-collapsed.png')
  })

  test('Edits are saved', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').fill('kimgjon')
    await page.getByRole('textbox').press('Enter')
    await page.goto('http://localhost:8080/course/1')
    await page.getByRole('link', { name: 'Tehtävät' }).click()
    await page.getByTestId('course-page').getByRole('textbox').click()
    await page.getByTestId('course-page').getByRole('textbox').fill('Matrii')
    await page.waitForTimeout(200)
    await expect(page).toHaveScreenshot('search-for-course.png')
    await page.getByRole('option', { name: 'Matriisikertolasku ruokakaupassa' }).click()
    expect(page.getByText('Matriisikertolasku ruokakaupassa')).toBeTruthy()
    expect(
      page.getByText('Tehtävässä tutustutaan matriisikertolaskuun käytännön sovelluksen avulla.Tehtävä'),
    ).toBeTruthy()
    expect(page.getByText('Default Multiplier: 0.14Viikko 5Sarja A')).toBeTruthy()
    await page.getByRole('button', { name: 'Muokkaa tehtävää' }).click()
    await page.locator('input[name="all-name-input"]').click()
    await page.locator('input[name="all-name-input"]').fill('Matriisikertolasku rautakaupassa')
    await page.locator('input[name="all-description-input"]').click()
    await page
      .locator('input[name="all-description-input"]')
      .fill('Tehtävässä tutustutaan matriisikertolaskuun teoreettisen sovelluksen avulla')
    await page.locator('input[name="all-description-input"]').click()
    await page
      .locator('input[name="all-description-input"]')
      .fill('Tehtävässä tutustutaan matriisikertolaskuun teoreettisen sovelluksen avulla')
    await page.locator('input[name="all-description-input"]').click()
    await page
      .locator('input[name="all-description-input"]')
      .fill('Tehtävässä tutustutaan matriisikertolaskuun teoreettisen sovelluksen avulla')
    await page.locator('input[name="points"]').fill('2')
    await page.waitForTimeout(200)
    await expect(page).toHaveScreenshot('edit-form-filled.png')

    await page.getByRole('button', { name: 'save' }).click()
    expect(page.getByText('Matriisikertolasku rautakaupassa')).toBeTruthy()
    expect(
      page.getByText('Tehtävässä tutustutaan matriisikertolaskuun teoreettisen sovelluksen avulla.Tehtävä'),
    ).toBeTruthy()
    expect(page.getByText('Default Multiplier: 0.14Viikko 5Sarja A')).toBeTruthy()
    await page.waitForTimeout(200)
    await expect(page).toHaveScreenshot('edit-form-edited-and-saved.png')
  })
})
