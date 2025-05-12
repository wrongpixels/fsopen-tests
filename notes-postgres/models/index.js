const Note = require('./note')
const User = require('./user')

User.hasMany(Note)
Note.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
})

module.exports = { Note, User }
