const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class Membership extends Model {}

Membership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'membership',
    underscored: true,
  }
)

module.exports = Membership
