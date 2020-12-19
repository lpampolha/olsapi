const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const ADSSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String
}, {autoCreate: true})

module.exports = mongoose.model('ads', ADSSchema)