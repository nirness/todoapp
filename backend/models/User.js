const { model, Schema} = require("mongoose")

module.exports = model('User', new Schema({
    email : {
        type: String,
        unique:  true,
        required: [true, "Email is required"]
    },
    password : {
        type: String,
        required: [true, "Password is required"],
        minlength : [5, "Password is too short"]
    }
}))