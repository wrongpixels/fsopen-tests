const Note = require('../models/note')
const User = require('../models/user')
const router = require('express').Router()

console.log('Testing router loaded')

router.get('/', (req, res) => {
    res.send('Testing router is working')
})

router.post('/reset', async (req, res) => {
    console.log('Reset endpoint hit')
    try {
        await Note.deleteMany({})
        await User.deleteMany({})
        console.log('Reset completed')
        res.status(204).end()
    } catch (error) {
        console.error('Reset failed:', error)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router