const { expect } = require('@playwright/test')

const userLogin = {
    username: 'admin',
    name: 'John Johnson',
    password: 'supersafe'
}
const note = 'Sooo this is a new note'
const login = async (page, loginData = null, awaitLogin = true ) => {
    if (!loginData)
    {
        loginData = userLogin
    }
    await page.getByText('Show Login').click()
    await page.getByTestId('username').fill(loginData.username)
    await page.getByTestId('password').fill(loginData.password)
    await page.getByRole('button', {name:'Sign in'}).click()
    if (awaitLogin)
    {
        await awaitForLogin(page, loginData.name)
    }
}
const awaitForLogin = async (page, user) => await page.getByText(`Welcome back, ${user}!`)

const showNewNote = async (page) => {
    const buttonCount = await page.getByRole('button', {name: 'Add new note'}).count()
    if (buttonCount > 0) {
        await page.getByRole('button', {name: 'Add new note'}).first().click()
    }
}
const addNote = async (page, content = '') => {
    if (!content)
    {
        content = note
    }
    await showNewNote(page)
    await page.getByTestId('note-content').fill(content)
    await page.getByRole('button', {name: 'Add'}).click()
    return await expect(page.getByText(content)).toBeVisible()
}

module.exports = {userLogin, login, addNote}