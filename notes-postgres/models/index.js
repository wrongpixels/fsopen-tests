const Note = require('./note')
const User = require('./user')
const Membership = require('./membership')
const Team = require('./team')

User.hasMany(Note)
Note.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
})
User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

module.exports = { Note, User, Membership, Team }
