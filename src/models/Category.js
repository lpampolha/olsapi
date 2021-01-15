const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
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
}
)
//, {autoCreate: true})

const modelName = 'Category'

if(mongoose.connectio && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
    }else{
        module.exports = mongoose.model(modelName, modelSchema)
}