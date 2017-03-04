import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: {type: String, required: true},
})

TagSchema.statics = {
    getById(id) {
        return this.findById(id)
            .exec()
    },
    list() {
        return this.find()
            .exec()
    }
}

export default mongoose.model('Tag', TagSchema)