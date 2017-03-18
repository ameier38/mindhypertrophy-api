import mongoose from 'mongoose'
import Promise from 'bluebird'
import Tag from './tag.model'

const debug = require('debug')('api:models:card.model')
const Schema = mongoose.Schema

const options = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

const CardSchema = new Schema({
    slug: {type: String, required: true},
    title: {type: String, required: true},
    summary: {type: String},
    imageUrl: {type: String},
    createdDate: {type: Date, default: Date.now()},
    content: {type: String, required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, options)

CardSchema.virtual('tagNames')
    .get( function() {
        return this.populate('tags').tags
            .map(tag => tag.name)
            .join()
    })

CardSchema.statics = {
    getById(id) {
        return this.findById(id)
            .populate('tags')
            .exec()
    },
    list() {
        return this.find()
            .populate('tags')
            .exec()
    },
    addNew(card) {
        debug('creating card')
        const newCard = Promise.all([
            Tag.getTagsFromTagNames(card.tagNames),
            this.create({...card})
        ]).then(([tags, card]) => {
            card.tags = tags
            debug('saving card')
            return card.save()
        })
        return newCard
    },
    update(id, updates) {
        debug(`updating card id: ${id}`)
        const { 
            slug, title, summary, imageUrl, 
            createdDate, content, tagNames 
        } = updates
        const updatedCard = Promise.all([
            Tag.getTagsFromTagNames(tagNames),
            this.findById(id).exec()
        ]).then(([tags, card]) => {
            card.slug = slug
            card.title = title
            card.summary = summary
            card.imageUrl = imageUrl
            card.createdDate = createdDate
            card.content = content
            card.tags = tags
            debug('saving card')
            return card.save()
        })
        return updatedCard
    },
    delete(id) {
        return this.findByIdAndRemove(id).exec()
    }
}

export default mongoose.model('Card', CardSchema)