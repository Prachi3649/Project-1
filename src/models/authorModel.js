const mongoose = require('mongoose')
const validator = require('validator');

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        requried: true
    },
    title: {
        type:String,
        enum: ['Mr', 'Mrs', 'Miss']
    },
    email: {
        type:String,
        requried: true,
        unique: true,
        trim: true,
        lowercase:true,
       //match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please fill a valid email address'],
        validate(value){ 
            if (!validator.isEmail(value)){
            throw new error("email is invalid")
         } 
        }
      
    },
    password: {
        type: String,
        requried: true,
        numberChars : ["0123456789", 'please fill password address'],
    }

}, { timestamps: true })
module.exports = mongoose.model('Author', authorSchema)
