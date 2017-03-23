import util from 'util'
import mongoose from 'mongoose'
import seedData from '../seedData'

const debug = require('debug')('api:server:db')
mongoose.Promise = require('bluebird')

const host = process.env.MONGO_HOST || 'localhost'
const database = process.env.MONGO_DATABASE || 'admin'
const port = process.env.MONGO_PORT || 27017
const url = `mongodb://${host}:${port}/${database}`

const configureMongo = () => {
    debug(`connecting to ${url}...`)
    mongoose.connect(url).then(
        () => seedData(),
        err => {
            debug(`unable to connect to database: ${err}`)
            setTimeout(configureMongo, 5000)
        }
    )
    if (process.env.MONGO_DEBUG) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
        });
    }


}

export default configureMongo