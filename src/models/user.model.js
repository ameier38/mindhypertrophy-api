import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String,
    admin: Boolean
})

UserSchema.statics = {
    getAdmin() {
        return this.findOne({username: 'admin'}).exec()
    },
    getById(id) {
        return this.findById(id).exec()
    },
    list() {
        return this.find().exec()
    }
}

export default mongoose.model('User', UserSchema)