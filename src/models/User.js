const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email: {
        type: String,
    },
    passwordHash :{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String},
    token: {
        type: String
    },
}
)
//, {autoCreate: true})

const modelName = 'User'

if(mongoose.connectio && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
    }else{
        module.exports = mongoose.model(modelName, modelSchema)
}