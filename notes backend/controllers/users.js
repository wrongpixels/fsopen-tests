const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = require('express').Router()

router.post('/', async (req, res) => {
    const {username, name, password} = req.body
    const existingUser = await User.findOne({username: `${username}`})
    console.log('Looking for', username)
    if (existingUser)
    {
        console.log("Found ONE")
        return res.status(400).json({
            Error: 'Server expected `username` to be unique'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
        username, name, passwordHash
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})

module.exports =  router