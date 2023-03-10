const mongoose = require('mongoose');
// REQUIRING THE APPLICATION SCHEMA
const applicationSchema = require('./application.js')

// CREATING SCHEMA 
const fishSchema = new mongoose.Schema({
    Name: {type: String, required: true },
    Description: {type: String, required: true},
    Rating: {type: String},
    Price: {type: Number},
    Quantity: {type: Number},
    photo: {type: String, required: "true"},
    isFeatured: {type: Boolean, default: false},
    applications: [applicationSchema]
})

// EXPORT THE SCHEMA AS A MONGOOSE MODEL 
module.exports = mongoose.model("Fish", fishSchema) // <----  that points to the file that the schema is in