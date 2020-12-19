const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const StateSchema = new mongoose.Schema({
    name: String
}, {autoCreate: true})

module.exports = mongoose.model('state', StateSchema)