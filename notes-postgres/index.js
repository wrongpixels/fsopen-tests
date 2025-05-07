require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note',
  },
)
Note.sync()

app.get('/api/notes', async (_, res) => {
  try {
    const notes = await Note.findAll()
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  const note = await Note.findByPk(id)
  res.json(note)
})

app.put('/api/notes/:id', async (req, res) => {
  try {
    const id = req.params.id
    const note = await Note.findByPk(id)
    console.log(note)
    if (!note) {
      return res.status(404).json({ error: 'Note not found' })
    }
    note.important = req.body.important
    await note.save()
    res.json(note)
  } catch (e) {
    res.status(500).json({ error: e.message }).end()
  }
})

app.post('/api/notes', async (req, res) => {
  try {
    const note = req.body
    console.log(note)
    const newNote = await Note.create(note)
    res.json(newNote)
  } catch (e) {
    console.log(e.message)
    res.status(400).json({ error: e.message })
  }
})
const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
