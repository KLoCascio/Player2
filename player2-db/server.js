const express = require('express')
const app = express()
const db = require('./db')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.port || 3001

const matchesController = require('./controllers/matchesController')
const profilesController = require('./controllers/profilesController')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal Server Error' })
  })

// PATHS
app.get('/', (req, res) => {
    res.send({ msg: 'Server Running'})
})

// MATCHES
app.get('/matches', matchesController.getMatch)
app.get('/matches/:id', matchesController.getMatchById)
app.post('/matches', matchesController.createMatch)
app.delete('/matches/:id', matchesController.deleteMatch)
app.put('/matches/:id', matchesController.updateMatch)

// PROFILES
app.get('/profiles', profilesController.getProfile)
app.get('/profiles/:id', profilesController.getProfileById)
app.post('/profiles', profilesController.createProfile)
app.delete('/profiles/:id', profilesController.deleteProfile)
app.put('/profiles/:id', profilesController.updateProfile)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))