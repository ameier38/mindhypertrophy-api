import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
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

export default mongoose.model('Tag', CardSchema)