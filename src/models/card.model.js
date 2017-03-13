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
        debug('getting virtual tagsNames')
        console.log(this.tags)
        return this.tags.map(
            tagId => {
                return Tag.getById(tagId)
                    .then(tag => tag.id)
            }).join()
    })
    .set(async function(tagNames) {
        debug('async create tags')
        const promises = [...Tag.asyncTagGenerator(tagNames)]
        console.log(promises)
        const tags = await Promise.all(promises)
        console.log(tags)
        this.tags = tags
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
    update(id, updates) {
        debug(`updating card id: ${id}`)
        console.log(updates)
        const updatedCard = this.findById(id).exec().then(
            card => {
                debug('card:')
                console.log(card)
                const { 
                    slug, title, summary, imageUrl, 
                    createdDate, content, tagNames 
                } = updates
                card.slug = slug
                card.title = title
                card.summary = summary
                card.imageUrl = imageUrl
                card.createdDate = createdDate
                card.content = content
                card.tagNames = tagNames
                debug('saving card')
                return card.save()
            }
        )
        return updatedCard
    },
    delete(id) {
        return this.findByIdAndRemove(id).exec()
    }
}

export default mongoose.model('Card', CardSchema)