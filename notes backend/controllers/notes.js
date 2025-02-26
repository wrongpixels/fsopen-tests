const Note = require("../models/note")
const User = require('../models/user')
const router = require("express").Router()
const jwt = require('jsonwebtoken')


const getTakenFrom = (req) => {
    const auth = req.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        console.log('found authentication')
        return auth.replace('Bearer ', '')
    }
    return null
}

router.post('/', async (req, res) => {
    if (!req.body || !req.body.content) {
        return res.status(400).json({Error: "New not cannot be empty"})
    }
    const token = getTakenFrom(req)
    console.log('token is ', token != null)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({error: 'token was invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const newNote = new Note({
        content: req.body.content,
        important: req.body.important || false,
        user: user.id
    })
    const addedNote = await newNote.save()
    user.notes = user.notes.concat(addedNote._id)
    await user.save()
    res.status(201).json(addedNote)
})
router.get("/", async (request, response) => {
    const notes = await Note.find({}).populate('user', {username: 1, name: 1})
    response.json(notes)
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const targetNote = await Note.findById(id)
    if (!targetNote) {
    }
    res.json(targetNote)
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const noteToDelete = await Note.findByIdAndDelete(id)
    res.status(204).end()
})
router.put('/:id', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({Error: 'Note cannot be empty'})
    }
    const id = req.params.id
    const editedNote = await Note.findByIdAndUpdate(id, req.body, {new: true, runValidators: true, context: 'query'})
    res.json(editedNote)
})

module.exports = router;