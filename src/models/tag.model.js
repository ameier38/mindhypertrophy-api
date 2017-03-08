import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
const Schema = mongoose.Schema

var TagSchema = new Schema({
    name: {type: String, required: true},
})

TagSchema.statics = {
    getById(id) {
        return this.findById(id).exec()
    },
    list() {
        let options = {
            lean: true,
            leanWithId: true
        }
        return this.paginate({}, options)
    }
}

mongoosePaginate(TagSchema)

export default mongoose.model('Tag', TagSchema)