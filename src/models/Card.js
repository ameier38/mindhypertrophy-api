import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
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
            .exec()
    },
    list() {
        return this.find()
            .exec()
    }
}

export default mongoose.model('Card', CardSchema)