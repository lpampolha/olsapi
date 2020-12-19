const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const CategorySchema = new mongoose.Schema({
    name: String,
    slug: String
}, {autoCreate: true})

module.exports = mongoose.model('category', CategorySchema)