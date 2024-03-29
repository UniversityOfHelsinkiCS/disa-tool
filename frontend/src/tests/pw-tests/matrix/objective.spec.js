import { test, expect } from '@playwright/test'

test.describe('Task objective tests', () => {
  test('Create objective', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').fill('kimgjon')
    await page.getByRole('textbox').press('Enter')
    await page.goto('http://localhost:8080/course/1/matrix')
    await expect(page.locator("[data-testid='matrix-level-container-1-1']")).toHaveScreenshot(
      'add-objective-module-before.png',
    )
    await page.getByRole('cell', { name: 'Osaan muokata yhtälöryhmää' }).getByRole('button').nth(4).click()
    await page.locator('input[name="all-name-input"]').click()
    await page.locator('input[name="all-name-input"]').fill('Oppikaamme asioita')
    await page.locator('input[name="all-name-input"]').press('Enter')
    await expect(page.locator("[data-testid='matrix-level-container-1-1']")).toHaveScreenshot(
      'add-objective-module-after.png',
    )
    await expect(page.getByText('Oppikaamme asioita')).toBeVisible()
  })

  test('Edit objective', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').fill('kimgjon')
    await page.getByRole('textbox').press('Enter')
    await page.goto('http://localhost:8080/course/1/matrix')
    await expect(page.locator("[data-testid='matrix-level-container-2-1']")).toHaveScreenshot(
      'edit-objective-module-before.png',
    )
    await page
      .getByRole('cell', {
        name: 'Tunnen vektorin määritelmän lukujonona ja osaan havainnollistaa tason vektoreita pisteinä tai suuntajanoina',
      })
      .getByRole('button')
      .nth(0)
      .click()
    await page.locator('input[name="all-name-input"]').click()
    await page.locator('input[name="all-name-input"]').clear()
    await page.locator('input[name="all-name-input"]').fill('Editoitu oppimistavoite')
    await page.locator('input[name="all-name-input"]').press('Enter')
    await expect(page.locator("[data-testid='matrix-level-container-2-1']")).toHaveScreenshot(
      'edit-objective-module-after.png',
    )
    await expect(page.getByText('Editoitu oppimistavoite')).toBeVisible()
  })

  test('Remove objective', async ({ page }) => {
    await page.goto('http://localhost:8080/')
    await page.getByRole('textbox').fill('kimgjon')
    await page.getByRole('textbox').press('Enter')
    await page.goto('http://localhost:8080/course/1/matrix')
    const objectivesContainer = page.getByTestId('matrix-level-objectives-3-1')
    await expect(objectivesContainer).toContainText(
      'Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio',
    )
    const objectivesCount = await objectivesContainer.locator('.MatrixObjective').count()
    await expect(objectivesCount).toBe(3)
    await page
      .getByRole('cell', {
        name: 'Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio',
      })
      .getByRole('button')
      .nth(1)
      .click()
    await page.locator("[data-testid='modal-delete-objective-16']").click()
    await expect(
      page.getByText('Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio'),
    ).not.toBeVisible()
    const objectivesCount2 = await objectivesContainer.locator('.MatrixObjective').count()
    await expect(objectivesCount2).toBe(2)
  })
})
