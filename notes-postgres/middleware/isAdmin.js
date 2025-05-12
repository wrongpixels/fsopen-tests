const isAdmin = async (req, res, next) => {
  try {
    if (!req.activeUser.admin) {
      return res.status(401).json({ Error: 'User must be administrator' })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = isAdmin
