// THIS WILL HOLD THE INDEX AND SHOW ROUTES

// REQUIRE MODULES
const express = require('express')
const router = express.Router()

// REQUIRING THE DATABASE CONNECTION GET INFO FROM MODELS
const db = require('../models')

// ROUTES
router.get('/', function(req,res ){
    // db.Fish.find({})
    //     .then(pets => res.json(pets))
    console.log("fishCTRL")
})

// // WILL GET PET BY INDIVIDUAL ID
// router.get('/:id', function(req,res){
//     db.Fish.findById(req.params.id)
//     .then(pet => res.json(pet))
//     .catch(() => res.send('UH-OH PET NOT FOUND'))
// })

// EXPORTING ROUTES TO SERVER.JS
module.exports = router; 