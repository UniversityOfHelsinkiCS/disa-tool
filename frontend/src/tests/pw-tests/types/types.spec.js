import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/')
  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('terhit')
  await page.getByRole('textbox').press('Enter')
  await page.getByRole('link', { name: 'Oma sivu' }).click()
  await page.reload()
  await page.getByRole('link', { name: 'Lineaarialgebra ja matriisilaskenta I kevät 2019' }).click()
  await page.getByRole('button', { name: 'Kurssin tavoitematriisi' }).click()
  await page.getByRole('button', { name: 'Muokkaa matriisia' }).click()
  await page.getByRole('link', { name: 'Tyypit' }).click()
  await expect(page).toHaveScreenshot('type-page.png')
  await page.locator('.CreateHeaderForm > div > .ui').click()
  await page.locator('input[name="all-name-input"]').click()
  await page.locator('input[name="all-name-input"]').fill('Uusi tyyppiotsake')
  await page.getByRole('button', { name: 'Tallenna' }).click()
  await expect(page).toHaveScreenshot('type-header-added.png')
  await page.locator('div:nth-child(3) > div > .Typelist > div > .CreateTypeForm > div > .ui').click()
  await page.locator('input[name="all-name-input"]').click()
  await page.locator('input[name="all-name-input"]').fill('Uusi tyyppi')
  await page.getByRole('spinbutton').click()
  await page.getByRole('spinbutton').fill('0.5')
  await page.getByRole('button', { name: 'Tallenna' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('type-added.png')
  await page
    .locator(
      'div:nth-child(3) > div > .Typelist > div > div > div:nth-child(3) > .editBlock > .EditTypeForm > div > .ui',
    )
    .click()
  await page.locator('input[name="all-name-input"]').click()
  await page.locator('input[name="all-name-input"]').fill('Uusi tyyppi -muokattu')
  await page.getByRole('button', { name: 'Tallenna' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('type-edited.png')
  await page.locator('div:nth-child(3) > div > div > .flexContainer > div > .EditHeaderForm > div > .ui').click()
  await page.locator('input[name="all-name-input"]').click()
  await page.locator('input[name="all-name-input"]').fill('Uusi tyyppiotsake - muokattu')
  await page.getByRole('button', { name: 'Tallenna' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('type-header-edited.png')
  await page
    .locator('div:nth-child(3) > div > .Typelist > div > div > div:nth-child(3) > .removeBlock > div > .ui')
    .click()
  await page.getByRole('button', { name: 'Poista' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('type-added-removed.png')
  await page.locator('div:nth-child(3) > div > div > .flexContainer > div:nth-child(2) > div > .ui').click()
  await page.getByRole('button', { name: 'Poista' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('type-header-added-removed.png')
  await page.locator('div:nth-child(2) > div > div > .flexContainer > div:nth-child(2) > div > .ui').click()
  await page.getByRole('button', { name: 'Poista' }).click()
  await page.waitForTimeout(200)
  await expect(page).toHaveScreenshot('whole-old-type-removed.png')
})
