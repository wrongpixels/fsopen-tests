const { PORT } = require('./util/config.js')
const { connectToDatabase } = require('./util/db')
const express = require('express')
const notesRouter = require('./controllers/notes')

const app = express()
app.use(express.json())
app.use('/api/notes', notesRouter)

const start = async() => {
  await connectToDatabase()
  app.listen(PORT, () => {console.log(`Running on http://localhost:${PORT}`)})
}
start()



