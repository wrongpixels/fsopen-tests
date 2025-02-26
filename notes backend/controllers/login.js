const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    const allMatches = !user ? false : await bcrypt.compare(password, user.passwordHash)
    if (!allMatches) {
        return res.status(401).json({error: 'invalid username or password'})
    }
    const tokenContent = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(
        tokenContent,
        process.env.SECRET,
        {expiresIn: 60 * 60}
    )
    console.log(token)
    res.status(200).json({token, username: user.username, name: user.name})
})
module.exports = router