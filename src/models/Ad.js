const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: {
        type: Number,
        min: 1
    },
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String,
}
)
//, {autoCreate: true})

const modelName = 'Ad'

if(mongoose.connectio && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
    }else{
        module.exports = mongoose.model(modelName, modelSchema)
}