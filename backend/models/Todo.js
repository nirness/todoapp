const { model, Schema, SchemaTypes} = require("mongoose")

module.exports = model('Todo', new Schema({
    userID : {
        type: SchemaTypes.ObjectId,
        required: [true, "ObjectID is requierd"]
    },
    timestamp : {
        type: Date,
        required: [true, "Date is requierd"]
    },
    text : {
        type: String,
        unique:  false,
        required: [true, "Text is requierd"]
    },
    isComplete : {
        type: Boolean,
        required: [true, "IsComplete is required"],
        
    }
}))