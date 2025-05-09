const router = require('express').Router()
const { Note, User } = require('../models')
const CustomError = require('../util/customError')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

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

const tokenExtractor = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.substring(7)
      : ''
    if (!token) {
      throw new CustomError('Not logged in', 401)
    }
    const tokenUser = jwt.verify(token, SECRET)
    const activeUser = await User.findByPk(tokenUser.id)
    if (!activeUser || !tokenUser) {
      throw new CustomError(
        tokenUser ? 'Invalid user token' : 'Expired or invalid token',
        401
      )
    }
    req.activeUser = activeUser
    next()
  } catch (error) {
    next(error)
  }
}

router.get('/', async (_, res) => {
  try {
    const notes = await Note.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['username'],
      },
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
