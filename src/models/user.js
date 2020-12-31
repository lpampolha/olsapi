const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
        select: false
    },
    // is_active: {
    //     type: Boolean,
    //     default: true
    // },
    // is_admin: {
    //     type: Boolean,
    //     default: false
    // },
    date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String}
    //passwordHash: String,
    //token: String
}, {autoCreate: true})

module.exports = mongoose.model('user', UserSchema)