const CustomError = require('../util/customError')
const { SECRET } = require('../util/config')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

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

module.exports = tokenExtractor
