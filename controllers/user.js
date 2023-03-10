const mongoose = require('mongoose');

// USER REVIEW SCHEMA
const userSchema = new mongoose.Schema(
    {reviewer: {type: String, required: true} },
    {title: {type: String, required: true}},
    {content: {type:String, require: true}},
)

// EXPORT SCHEMA AS MONGOOSE MODEL
module.exports = mongoose.model('User', userSchema)