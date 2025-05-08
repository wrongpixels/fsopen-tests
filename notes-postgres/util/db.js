const {DATABASE_URL} = require('../util/config')
const { Sequelize} = require('sequelize')

const sequelize   = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to Postgres DB')
        
    } catch (error) {
        console.error(`Couldn't connect to Postgres`)        
        return process.exit(1)
    }
}

module.exports = {connectToDatabase, sequelize }