const router = require('express').Router()
const { User, Note, Team } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')
const isAdmin = require('../middleware/isAdmin')
const CustomError = require('../util/customError')

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

const getUsers = async (admin = false, disabled = false) => {
  if (admin || disabled) {
    if (admin && disabled) {
      return await User.scope('admin', 'disabled').findAll()
    }
    return await User.scope(admin ? 'admin' : 'disabled').findAll()
  }
  return await User.findAll()
}

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Note,
          attributes: {
            exclude: ['userId'],
          },
        },
        {
          model: Note,
          as: 'marked_notes',
          attributes: {
            exclude: ['userId'],
          },
          include: {
            model: User,
            attributes: ['name'],
          },
          through: {
            attributes: [],
          },
        },
      ],
    })
    if (!user) {
      throw new CustomError('User not found', 404)
    }
    let teams = undefined
    if (req.query.teams) {
      teams = await user.getTeams({
        attributes: ['name'],
        joinTableAttributes: [],
      })
    }
    res.json({ ...user.toJSON(), teams })
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
