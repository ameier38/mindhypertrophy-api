import mongoose from 'mongoose'
import app from './app'

Promise = require('bluebird') // eslint-disable-line no-global-assign
mongoose.Promise = Promise

const mongoUri = "mongodb://localhost/mindhypertrophy"
mongoose.connect(mongoUri)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})