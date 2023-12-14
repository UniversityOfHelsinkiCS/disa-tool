import { test, expect } from '@playwright/test'

test('Grades', async ({ page }) => {
  await page.goto('http://localhost:8080/')
  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('terhit')
  await page.getByRole('textbox').press('Enter')
  await page.getByRole('link', { name: 'Oma sivu' }).click()
  await page.getByRole('link', { name: 'Lineaarialgebra ja' }).click()
  await page.getByRole('button', { name: 'Kurssin tavoitematriisi' }).click()
  await page.getByRole('button', { name: 'Muokkaa matriisia' }).click()
  await page.getByRole('link', { name: 'Arvosteluperusteet' }).click()
  await page.waitForTimeout(1000)
  await expect(page.getByTestId('category-grade-table-grade-category-10')).toHaveScreenshot(
    'edit-category-grades-before-creating.png',
  )
  await expect(page.locator('tbody')).toContainText('Vektoriavaruudet')
  await page.getByRole('cell', { name: 'Yhtälöryhmät' }).click()
  await page
    .locator('div')
    .filter({ hasText: /^Lisää ja muokkaa kurssin arvosanoja$/ })
    .getByRole('button')
    .nth(1)
    .click()
  await page.getByTestId('multilingual-field-single-grade-placeholderId').getByRole('textbox').click()
  await page.getByTestId('multilingual-field-single-grade-placeholderId').getByRole('textbox').fill('5')
  await page
    .locator('div')
    .filter({ hasText: /^Arvosanaa vastaava taitotaso1-23-45$/ })
    .getByRole('listbox')
    .click()
  await page.getByRole('option', { name: '5' }).click()
  await page.getByRole('spinbutton').click()
  await page.getByRole('spinbutton').fill('0.8')
  await page.locator('form').getByRole('button', { name: 'Tallenna' }).click()
  await page.goto('http://localhost:8080/course/2/grades')
  await expect(page.getByTestId('edit-grades-tab-grade-1')).toHaveScreenshot('edit-grades-tab-grade-after-creating.png')

  await page.goto('http://localhost:8080/course/2/grades')
  await page.getByTestId('edit-grades-tab-skill_level')
  await expect(page.getByTestId('edit-grades-tab-skill_level').getByRole('paragraph')).toContainText(
    'Arvosanaa vastaava taitotaso: 5',
  )
  await expect(page.getByTestId('edit-grades-tab-needed_for_grade').getByRole('paragraph')).toContainText(
    'Vaadittu suoritustaso: 80%',
  )
  await expect(page.getByTestId('edit-grades-tab-prerequisite').getByRole('paragraph')).toContainText(
    'Vaadittu alempi arvosanasuoritus:',
  )

  await expect(page.getByTestId('category-grade-table-grade-category-10')).toHaveScreenshot(
    'edit-category-grades-after-creating.png',
  )
})
