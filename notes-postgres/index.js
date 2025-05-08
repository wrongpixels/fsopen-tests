const { PORT } = require('./util/config.js')
const { connectToDatabase } = require('./util/db')
const express = require('express')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users.js')

const app = express()
app.use(express.json())
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  })
}
start()
