import '../config'
import app from './app'
import configureMongo from './db'

// enable advanced debugging
const debug = require('debug')('api:server:index')

// configure the mongo database
configureMongo()

// set the api port
const PORT = process.env.PORT || 5000

// start the server
app.listen(PORT, () => {
  debug(`App listening on port ${PORT}!`)
})