import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CardSchema = new Schema({
    slug: {type: String, required: true},
    title: {type: String, required: true},
    summary: {type: String},
    imageUrl: {type: String},
    createdDate: {type: Date, default: Date.now()},
    content: {type: String, required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
})

CardSchema.statics = {
    getBySlug(slug) {
        return this.findOne({slug: slug})
            .populate('tags')
            .exec()
    },
    list() {
        return this.find()
            .populate('tags')
            .exec()
    }
}

export default mongoose.model('Card', CardSchema)