const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
   
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },

    createdDate: {
        type: Date,
        default: new Date(new Date().toUTCString())
    },
    updatedDate: {
        type: Date,
        default: new Date(new Date().toUTCString())
    },

});


var user = new mongoose.model('users', UserSchema);
module.exports = user;
