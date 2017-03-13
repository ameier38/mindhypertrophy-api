import mongoose from 'mongoose'
import Promise from 'bluebird'

const debug = require('debug')('api:models:tag.model')
const Schema = mongoose.Schema

const options = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

var TagSchema = new Schema({
    name: {type: String, required: true},
}, options)

TagSchema.statics = {
    getById(id) {
        return this.findById(id).exec()
    },
    getOrCreate(name) {
        return this.findOne({ name }).exec()
            .then(tag => {
                if (!tag) {
                    debug(`creating tag ${name}`)
                    return this.create({ name })
                }
                else {
                    debug(`found tag ${name}`)
                    return Promise.resolve(tag)
                }
            })
    },
    list() {
        return this.find().exec()
    },
    update(id, updatedTag) {
        return this.findByIdAndUpdate(id, updatedTag, { new: true }).exec()
    },
    delete(id) {
        return this.findByIdAndRemove(id).exec()
    },
    *asyncTagGenerator(tagNames) {
        for (let name of tagNames.split(',')) {
            // yield a Promise
            yield this.getOrCreate(name)
        }
    }
}

export default mongoose.model('Tag', TagSchema)