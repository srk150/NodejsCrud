const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const imageSchema = new Schema({
   
    imagename:String,
    createdDate: {
        type: Date,
        default: new Date(new Date().toUTCString())
    },
    updatedDate: {
        type: Date,
        default: new Date(new Date().toUTCString())
    },

});


var images = new mongoose.model('images', imageSchema);
module.exports = images;
