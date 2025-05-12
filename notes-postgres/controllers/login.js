const router = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const CustomError = require('../util/customError')

router.post('/', async (req, res, next) => {
  try {
    const seekedUser = await User.findOne({
      where: { username: req.body.username },
    })
    let badCredentials = true
    if (seekedUser) {
      badCredentials = req.body.password !== 'supersafe'
    }
    if (badCredentials) {
      throw new CustomError('Incorrect credentials', 401)
    }
    if (seekedUser.disabled) {
      throw new CustomError(
        'User not allowed to login. Please contact administration',
        401
      )
    }
    const userData = { id: seekedUser.id, username: seekedUser.username }
    const token = jwt.sign(userData, SECRET)
    res
      .status(200)
      .send({ token, username: userData.username, name: seekedUser.name })
  } catch (error) {
    next(error)
  }
})

module.exports = router
