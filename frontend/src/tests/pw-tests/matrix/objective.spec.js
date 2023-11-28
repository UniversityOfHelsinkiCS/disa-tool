import { test, expect } from '@playwright/test'

test.describe('Task objective tests', () => {
  test('Create objective', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').fill('kimgjon')
    await page.getByRole('textbox').press('Enter')
    await page.goto('http://localhost:8080/course/1/matrix')
    await expect(page.locator("[data-testid='matrix-level-1-1']")).toHaveScreenshot('add-objective-module-before.png')
    await page.getByRole('cell', { name: 'Osaan muokata yhtälöryhmää' }).getByRole('button').nth(4).click()
    await page.locator('input[name="name-input"]').click()
    await page.locator('input[name="name-input"]').fill('Oppikaamme asioita')
    await page.locator('input[name="name-input"]').press('Enter')
    await expect(page.locator("[data-testid='matrix-level-1-1']")).toHaveScreenshot('add-objective-module-after.png')
    await expect(page.getByText('Oppikaamme asioita')).toBeVisible()
  })

  test('Edit objective', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').fill('kimgjon')
    await page.getByRole('textbox').press('Enter')
    await page.goto('http://localhost:8080/course/1/matrix')
    await expect(page.locator("[data-testid='matrix-level-2-1']")).toHaveScreenshot('edit-objective-module-before.png')
    await page
      .getByRole('cell', {
        name: 'Tunnen vektorin määritelmän lukujonona ja osaan havainnollistaa tason vektoreita pisteinä tai suuntajanoina',
      })
      .getByRole('button')
      .nth(0)
      .click()
    await page.locator('input[name="name-input"]').click()
    await page.locator('input[name="name-input"]').clear()
    await page.locator('input[name="name-input"]').fill('Editoitu oppimistavoite')
    await page.locator('input[name="name-input"]').press('Enter')
    await expect(page.locator("[data-testid='matrix-level-2-1']")).toHaveScreenshot('edit-objective-module-after.png')
    await expect(page.getByText('Editoitu oppimistavoite')).toBeVisible()
  })

  test('Remove objective', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').fill('kimgjon')
    await page.getByRole('textbox').press('Enter')
    await page.goto('http://localhost:8080/course/1/matrix')
    await expect(page.locator("[data-testid='matrix-level-3-1']")).toHaveScreenshot(
      'remove-objective-module-before.png',
    )
    await page
      .getByRole('cell', {
        name: 'Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio',
      })
      .getByRole('button')
      .nth(1)
      .click()
    await page.locator("[data-testid='modal-delete-objective-16']").click()
    await expect(page.locator("[data-testid='matrix-level-3-1']")).toHaveScreenshot('remove-objective-module-after.png')
    await expect(
      page.getByText('Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio'),
    ).not.toBeVisible()
  })
})
