import mongoose from 'mongoose'
import Promise from 'bluebird'
import Tag from './tag.model'

const debug = require('debug')('api:models:article.model')
const Schema = mongoose.Schema

const options = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

const ArticleSchema = new Schema({
    slug: {type: String, required: true},
    title: {type: String, required: true},
    summary: {type: String},
    imageUrl: {type: String},
    createdDate: {type: Date, default: Date.now()},
    markdown: {type: String, required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, options)

ArticleSchema.virtual('tagNames')
    .get( function() {
        return this.populate('tags').tags
            .map(tag => tag.name)
            .join()
    })

ArticleSchema.statics = {
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
    addNew(article) {
        debug('creating article')
        const newArticle = Promise.all([
            Tag.getTagsFromTagNames(article.tagNames),
            this.create({...article})
        ]).then(([tags, article]) => {
            article.tags = tags
            debug('saving article')
            return article.save()
        })
        return newArticle
    },
    update(id, updates) {
        debug(`updating article id: ${id}`)
        const { 
            slug, title, summary, imageUrl, 
            createdDate, markdown, tagNames 
        } = updates
        const updatedArticle = Promise.all([
            Tag.getTagsFromTagNames(tagNames),
            this.findById(id).exec()
        ]).then(([tags, article]) => {
            article.slug = slug
            article.title = title
            article.summary = summary
            article.imageUrl = imageUrl
            article.createdDate = createdDate
            article.markdown = markdown
            article.tags = tags
            debug('saving article')
            return article.save()
        })
        return updatedArticle
    },
    delete(id) {
        return this.findByIdAndRemove(id).exec()
    }
}

export default mongoose.model('Article', ArticleSchema)