import { test, expect } from '@playwright/test'

test('Category question', async ({ page }) => {
  await page.goto('http://localhost:8080/')
  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('terhit')
  await page.getByRole('textbox').press('Enter')
  await page.getByRole('link', { name: 'Kurssit' }).click()
  await page.getByRole('link', { name: 'Oma sivu' }).click()
  await page.getByRole('link', { name: 'Lineaarialgebra ja matriisilaskenta I kevät 2019' }).click()
  await page.getByRole('button', { name: 'Luo kategoriapohjainen itsearviointi' }).click()
  await expect(page.locator("[data-testid='self-assessment-form-page']")).toHaveScreenshot(
    'self-assessment-category-page.png',
  )
  await page.getByRole('heading', { name: 'Itsearviointitehtävä Muokkaa' }).getByRole('button').click()
  await page.getByRole('button', { name: 'Aseta' }).click()
  await page
    .locator('div')
    .filter({ hasText: /^OhjeitaMuokkaa$/ })
    .getByRole('button')
    .click()
  await page.getByRole('button', { name: 'Aseta' }).click()

  // Can be toggled off
  await expect(page.getByTestId('toggle-category-included-button-10')).toHaveText('Mukana itsearviossa')
  await expect(page.getByTestId('show-explanation-button-10').getByRole('checkbox')).toBeChecked()
  await expect(page.locator("div[data-testid='edit-category-module-10']")).toHaveScreenshot(
    'edit-category-module-before-clicks.png',
  )
  await page.getByTestId('show-explanation-button-10').getByText('Perustelut arvosanalle').click()
  await page.getByTestId('toggle-category-included-button-10').click()
  await expect(page.getByTestId('toggle-category-included-button-10')).toHaveText('Ei mukana itsearviossa')
  await expect(page.getByTestId('show-explanation-button-10').getByRole('checkbox')).not.toBeChecked()
  await expect(page.locator("[data-testid='edit-category-module-10']")).toHaveScreenshot(
    'edit-category-module-after-clicks.png',
  )

  // Can be toggled back
  await expect(page.getByTestId('toggle-category-included-button-10')).toHaveText('Ei mukana itsearviossa')
  await page.getByTestId('toggle-category-included-button-10').click()
  await expect(page.getByTestId('toggle-category-included-button-10')).toHaveText('Mukana itsearviossa')
  await page.getByTestId('show-explanation-button-10').getByText('Perustelut arvosanalle').click()
  await expect(page.getByTestId('show-explanation-button-10').getByRole('checkbox')).toBeChecked()

  // Categories can be moved toggle-down-button-
  await expect(
    page.getByTestId('self-assessment-section-list-Kurssin osa-alueet').getByRole('listitem').nth(0),
  ).toContainText('Yhtälöryhmät')
  await page.getByTestId('toggle-down-button-10').click()
  await expect(
    page.getByTestId('self-assessment-section-list-Kurssin osa-alueet').getByRole('listitem').nth(0),
  ).toContainText('Vektoriavaruudet')
  await page.getByTestId('toggle-up-button-12').click()
  await expect(
    page.getByTestId('self-assessment-section-list-Kurssin osa-alueet').getByRole('listitem').nth(1),
  ).toContainText('Virittäminen ja vapaus')

  // Add open question
  await page.getByRole('button', { name: 'Lisää avoin kysymys' }).click()
  await page.locator('input[name="all-name-input"]').click()
  await page.locator('input[name="all-name-input"]').fill('Mikä meni hyvin')
  await page.getByRole('button', { name: 'Tallenna' }).nth(2).click()

  // Add answer for the question
  await page.getByPlaceholder('Kirjoita vastaus tähän').click()
  await page.getByPlaceholder('Kirjoita vastaus tähän').fill('Kaikki meni hyvin')

  await page.getByTestId('open-question-module-remove-button-20').click()
  await page.getByRole('button', { name: 'Ok', exact: true }).click()
  await page.getByRole('button', { name: 'Esikatsele' }).first().click()
  await expect(page).toHaveScreenshot('self-assessment-preview-after.png')
  await page.getByRole('button', { name: 'Takaisin' }).nth(1).click()
  await page.getByRole('button', { name: 'Tallenna' }).first().click()
  await expect(page.getByTestId('teacher-assessment-list')).toHaveScreenshot('course-page-course-info-after.png')
})
