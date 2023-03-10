const mongoose = require('mongoose')

// CREATING REVIEW SCHEMA
const reviewSchema = new mongoose.Schema(
    {reviewer: {type: String, required: true} },
    {title: {type: String, required: true}},
    {content: {type: String, required: true}},
    { timestamps: true}
);

// Exporting schema 
module.exports = mongoose.model('Review', reviewSchema);