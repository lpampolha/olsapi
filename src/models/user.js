const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    state: String,
    passwordHash: String,
    token: String
}, {autoCreate: true})

module.exports = mongoose.model('user', UserSchema)