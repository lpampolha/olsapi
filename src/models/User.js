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
    date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String},
    passwordHash: {
        type: String
    },
    token: {
        type: String
    },
}
)
//, {autoCreate: true})

const modelName = User

if(mongoose.connectio && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
    }else{
        module.exports = mongoose.model(modelName, modelSchema)
}