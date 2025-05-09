const Note = require('./note')
const User = require('./user')

User.hasMany(Note)
Note.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
})
User.sync({ alter: true })
Note.sync({ alter: true })

module.exports = { Note, User }
