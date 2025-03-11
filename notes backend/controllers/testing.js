const Note = require('../models/note')
const User = require('../models/user')
const router = require('express').Router()

router.post('/reset/:db', async (req, res) => {
    const dbToErase = req.params.db
    if (!dbToErase || dbToErase === 'notes') {
        await Note.deleteMany({})
    }
    if (!dbToErase || dbToErase === 'users') {
        await User.deleteMany({})
    }
    res.status(204).end()
})
module.exports = router