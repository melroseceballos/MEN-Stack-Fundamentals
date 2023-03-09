// THIS WILL HOLD THE INDEX AND SHOW ROUTES

// REQUIRE MODULES
const express = require('express')
const router = express.Router()

// REQUIRING THE DATABASE CONNECTION GET INFO FROM MODELS
const db = require('../models')

// INDEX ROUTE
router.get('/', function(req,res ){
    db.Fish.find({})
        .then(pets => res.json(pets))
})

// SHOW ROUTE = WILL GET PET BY ID
router.get('/:id', function(req,res){
    db.Fish.findById(req.params.id)
    .then(fish => res.render(fish))
    .catch(() => res.send('UH-OH PET NOT FOUND'))
})

// HOME PAGE
router.get('/', function(req, res){
    db.Fish.find({})
    .then(pets =>{
        res.render('fish-index',{
            Fish: pets
        })
    })
    .catch(() => res.send ('UH OH PAGE NOT FOUND'))
})

// EXPORTING ROUTES TO SERVER.JS
module.exports = router; 