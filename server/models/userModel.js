
const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    }, 
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    activationSecret: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

module.exports = model("user", userSchema) 