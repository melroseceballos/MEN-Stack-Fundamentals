const mongoose = require('mongoose');

// CREATING SCHEMA 
const fishSchema = new mongoose.Schema({
    Name: {type: String, required: true },
    Description: {type: String, required: true},
    Rating: {type: String},
    Price: {type: Number},
    Quantity: {type: Number},
    photo: {type: String, required: "true"},
    isFeatured: {type: Boolean, default: false}
})

// EXPORT THE SCHEMA AS A MONGOOSE MODEL 
module.exports = mongoose.model("Fish", fishSchema) // <----  that points to the file that the schema is in