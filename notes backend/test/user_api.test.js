const bcrypt = require('bcrypt')
const User = require('../models/user')
const {test, describe, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helpers')

const api = supertest(app)

describe('when there\s a user in database', () => {
    beforeEach( async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('zekkret', 10)
        const user = new User({
            username: 'root',
            passwordHash
        })
        await user.save()
    })

    test.only('creation works with fresh username', async () => {
        const usersOnStart = await helper.getAllUsersInDB()
        const newUser = helper.newUserData
        const addedUser = await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersOnEnd = await helper.getAllUsersInDB()
        assert.strictEqual(usersOnEnd.length, usersOnStart.length + 1)
        assert(usersOnEnd.find(u => u.username === newUser.username))
    })
    test.only('creation fails if user exists', async () => {
        const usersOnStart = await helper.getAllUsersInDB()
        const user = {username: 'root', name: 'Super', password: '1234'}
        const result = await api.post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersOnEnd = await helper.getAllUsersInDB()
        assert(result.body.Error.includes('expected `username` to be unique'))
        assert.strictEqual(usersOnStart.length, usersOnEnd.length)
    })

})

test('can delete if only one', async () => {
    const allUsers = User.find({})
    if (allUsers.length === 1)
    {
        const user = allUsers[0]
        await api.delete(user.id).expect(201)
    }

})

after(() => {
    mongoose.connection.close()
})



