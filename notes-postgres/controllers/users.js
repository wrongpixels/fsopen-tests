const router = require('express').Router()
const { User, Note, Team } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')
const isAdmin = require('../middleware/isAdmin')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Note,
          attributes: { exclude: ['userId'] },
        },
        {
          model: Team,
          attributes: ['name', 'id'],
          through: {
            attributes: [],
          },
        },
      ],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Note,
      },
    })
    res.json({
      username: user.username,
      name: user.name,
      note_count: user.notes.length,
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:username', tokenExtractor, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    })
    if (!user) {
      return res.status(404)
    }
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
