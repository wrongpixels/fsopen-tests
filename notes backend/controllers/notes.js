const Note = require("../models/note")
const router = require("express").Router()

router.post('/', async (req, res) => {
    if (!req.body || !req.body.content)
    {
        return res.status(400).json({Error: "New not cannot be empty"})
    }
    const newNote = new Note({content: req.body.content, important: req.body.important || false})
    const addedNote = await newNote.save()
    res.status(201).json(addedNote)
})
router.get("/", async (request, response) =>{
    const notes = await Note.find({})
    response.json(notes)
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const targetNote = await Note.findById(id)
    if (!targetNote)
    {
     }
    res.json(targetNote)
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const noteToDelete = await Note.findByIdAndDelete(id)
    res.status(204).end()
})
router.put('/:id', async (req, res) => {
    if (!req.body)
    {
        return res.status(400).json({Error: 'Note cannot be empty'})
    }
    const id = req.params.id
    const editedNote = await Note.findByIdAndUpdate(id, req.body, {new: true, runValidators: true, context:'query'})
    res.json(editedNote)
})

module.exports = router;