import util from 'util'
import mongoose from 'mongoose'
import app from './app'

const debug = require('debug')('server:index')

Promise = require('bluebird') // eslint-disable-line no-global-assign
mongoose.Promise = Promise

const mongoHost = process.env.MONGO_HOST || "localhost"
const mongoUri = `mongodb://${mongoHost}/mindhypertrophy`
mongoose.connect(mongoUri)
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
})
if (process.env.MONGO_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})