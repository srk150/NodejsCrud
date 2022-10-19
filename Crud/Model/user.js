const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
   
    emp_name: {
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
    designation: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: false
    },

    emp_type:{
        type: String,
        required: false
    },

    salary:{
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


var user = new mongoose.model('user', UserSchema);
module.exports = user;
