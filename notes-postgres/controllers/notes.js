const router = require('express').Router()
const { Note, User } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')
const { Op } = require('sequelize')

const noteFinder = async (req, res, next) => {
  try {
    req.note = await Note.findByPk(req.params.id)
    if (!req.note) {
      return res.status(404).json('Note not found')
    }
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

router.get('/', async (req, res) => {
  try {
    const where = {}

    if (req.query.search) {
      where.content = {
        [Op.substring]: req.query.search,
      }
    }
    if (req.query.important) {
      where.important = req.query.important
    }

    const notes = await Note.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
      where,
    })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', noteFinder, async (req, res) => {
  res.json(req.note)
})

router.delete('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy()
  }
  res.status(204).end()
})

router.put('/:id', noteFinder, async (req, res) => {
  try {
    req.note.important = req.body.important
    await req.note.save()
    res.json(req.note)
  } catch (e) {
    res.status(500).json({ error: e.message }).end()
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = req.activeUser
    const note = req.body
    console.log(note)
    const newNote = await Note.create({
      ...note,
      userId: user.id,
      date: new Date(),
    })
    res.status(201).json(newNote)
  } catch (e) {
    console.log(e.message)
    res.status(400).json({ error: e.message })
  }
})

module.exports = router
