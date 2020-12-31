const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    icon: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
}, {autoCreate: true})

module.exports = mongoose.model('category', CategorySchema)