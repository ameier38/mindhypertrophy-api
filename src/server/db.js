import util from 'util'
import mongoose from 'mongoose'
import { seedCard } from '../controllers/card.controller'
import { seedTag } from '../controllers/tag.controller'
import { seedAdmin } from '../controllers/user.controller'

const debug = require('debug')('api:server:db')
mongoose.Promise = require('bluebird')

// add initial data to the database
// only seeds if data does not exist
const seedMongo = () => {
    seedAdmin()
    seedTag()
    seedCard()
}

const configureMongo = () => {

    const host = process.env.MONGO_HOST || 'localhost'
    const database = process.env.MONGO_DATABASE || 'admin'
    const port = process.env.MONGO_PORT || 27017
    const url = `mongodb://${host}:${port}/${database}`

    debug(`connecting to ${url}...`)
    mongoose.connect(url).then(
        () => seedMongo(),
        err => {
            debug(err)
            debug(`unable to connect to database ${url}`);
        }
    )
    if (process.env.MONGO_DEBUG) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
        });
    }


}

export default configureMongo