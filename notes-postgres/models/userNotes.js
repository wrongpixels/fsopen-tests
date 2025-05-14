const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class UserNotes extends Model {}

UserNotes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'notes',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user_notes',
  },
)

module.exports = UserNotes
