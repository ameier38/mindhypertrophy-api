import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
const Schema = mongoose.Schema

var CardSchema = new Schema({
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
        let options = {
            lean: true,
            leanWithId: true,
            limit: 10,
            populate: 'tags'
        }
        return this.paginate({}, options)
    }
}

mongoosePaginate(CardSchema)

export default mongoose.model('Card', CardSchema)