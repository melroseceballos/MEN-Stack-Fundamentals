const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema ({
    reviewer: {type:String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
})

// EXPORT SCHEMA
module.exports = reviewSchema