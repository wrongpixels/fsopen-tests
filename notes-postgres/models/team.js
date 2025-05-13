const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'team',
  }
)

module.exports = Team
