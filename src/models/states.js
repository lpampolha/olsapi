const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const StatesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
}, {autoCreate: true})

module.exports = mongoose.model('states', StatesSchema)