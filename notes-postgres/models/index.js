const Note = require('./note')
const User = require('./user')
const Membership = require('./membership')
const Team = require('./team')
const UserNotes = require('./userNotes')

User.hasMany(Note)
Note.belongsTo(User)
User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })
User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' })
Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' })

module.exports = { Note, User, Membership, Team, UserNotes }
