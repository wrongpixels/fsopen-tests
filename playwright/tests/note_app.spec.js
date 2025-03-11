const { test, describe, beforeEach, expect } = require('@playwright/test')
const FrontURL = 'http://localhost:5173'
const BackURL = 'http://localhost:3001'
const resetURL = `${BackURL}/api/testing/reset`

const userLogin = {
    username: 'admin',
    name: 'John Johnson',
    password: 'supersafe'
}

const note = 'Sooo this is a new note'

beforeEach(async ({page, request}) => {
    await request.post(resetURL)
    await request.post(`${FrontURL}/api/users`, {data: userLogin})
    await page.goto(FrontURL)
})

const login = async (page) => {
    await page.getByText('Show Login').click()
    await page.getByTestId('username').fill(userLogin.username)
    await page.getByTestId('password').fill(userLogin.password)
    await page.getByRole('button', {name:'Sign in'}).click()
    return await expect(page.getByText(`Welcome back, ${userLogin.name}!`)).toBeVisible()
}
const addNote = async (page) => {
    await page.getByTestId('note-content').fill(note)
    await page.getByRole('button', {name: 'Add'}).click()
    return await page.getByText(note)
}

describe('Note app', () => {
    test('front page can be indeed opened', async ({page}) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of WTF of Helsinki')).toBeVisible()
        })
    test('user can login', async ({page}) => {
        await login(page)
        })

    describe('when logged in', () => {
        beforeEach(async ({page}) => await login(page))

        test('can create a new note', async ({page}) => {
            await expect(await addNote(page)).toBeVisible()
        })

        test('can toggle importance of a note', async ({page}) => {
            await addNote(page)
            await page.getByRole('button', {name: 'Set important'}).click()
            const button = await page.getByRole('button', {name: 'Set not important'})
            await expect(button).toBeVisible()
            await button.click()
            await expect(page.getByRole('button', {name: 'Set important'})).toBeVisible()
        })
    })
})
