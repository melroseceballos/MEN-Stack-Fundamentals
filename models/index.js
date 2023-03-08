// CONNECTING EXPRESS APP TO MONGO DATABASE
require('dotenv').config()
const mongoose = require('mongoose')
const mongodburi=process.env.MONGODBURI;

// ASYNC FUNCTION THAT WILL CONNECT MONGOOSE TO MONGO DATABASE
(async function () {
    await mongoose.connect(mongodburi);
    console.log("You are now connected to" , mongodburi);})
().catch(err => console.log('Failed to connect: \n' + err))

// GET MONGOOSE MODEL
module.exports ={
    Fish: require('./fishSchema')
}