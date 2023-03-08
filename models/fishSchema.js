const mongoose = require('mongoose');

// CREATING SCHEMA 
const fishSchema = new mongoose.Schema({
    Name: {type: String, required: true },
    Description: {type: String, required: true},
    Rating: {type: String},
    Price: {type: Number},
    Quantity: {type: Number}
})

// EXPORT THE SCHEMA AS A MONGOOSE MODEL 
module.exports = mongoose.model{
    Fish = require('./fishSchema') // <----  that points to the file that the schema is in
}
