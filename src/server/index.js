import app from './app'
import configureMongo from './db'

require('dotenv').config()

const debug = require('debug')('api:server:index')

configureMongo()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  debug(`App listening on port ${PORT}!`)
})