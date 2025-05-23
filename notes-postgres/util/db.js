const { DATABASE_URL } = require('../util/config')
const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to Postgres DB')
  } catch (error) {
    console.error(`Couldn't connect to Postgres`)
    return process.exit(1)
  }
  return null
}
const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)

  const migrations = await migrator.up()
  console.log('Migrations are up to date!', {
    files: migrations.map((m) => m.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}
module.exports = { connectToDatabase, sequelize, rollbackMigration }
