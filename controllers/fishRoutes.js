// THIS WILL HOLD THE INDEX AND SHOW ROUTES

// REQUIRE MODULES
const express = require('express')
const router = express.Router()

// REQUIRING THE DATABASE CONNECTION GET INFO FROM MODELS
const db = require('../models')
const fish = require('../models/seed')

// HOME PAGE
router.get('/', function(req, res){
    db.Fish.find({})
    .then(pets =>{
        res.render('fishIndex',{
            Fish: pets
        })
    })
    .catch(() => res.send ('UH OH PAGE NOT FOUND'))
})


// INDEX ROUTE
router.get('/', function (req, res) {
    db.Fish.find({})
        .then(fish => {
            res.render('fishDetails', {
                Fish: fish
            })
        })
})
// FORM ROUTE
router. get('/new',(req,res) =>{
    res.render('new-form')
})

// Create ROUTE THAT WHEN A POST REQUEST IS RECIEVED IT CREATES A NEW DOCUMENT
router.post('/', (req,res) => {
    db.Fish.create(req.body)
    .then(fish => res.redirect('/fishRoutes'))
})


// SHOW ROUTE = WILL GET PET BY ID
router.get('/:id', function (req, res) {
    db.Fish.findById(req.params.id)
        .then(fish => {
            console.log(fish)
            res.render('FishDetails', {
                Fish: fish
           })
        })
        .catch(() => res.send('Uh-oh Pet Not Found'))
})

// EDIT ROUTE
router.get('/:id/edit',(req,res)=>{
    db.Fish.findById(req.params.id)
    .then(fish => res.send('You\'ll be editing pet' + fish._id))
})

// UPDATE ROUTE
router.put('/:id', (req,res) => {
    db.Fish.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
)
    .then(fish => res.json(fish))
})

// DESTROY ROUTE
router.delete('/:id', (req,res)=>{
    db.Fish.findByIdAndRemove(req.params.id)
    .then(fish => res.send('You deleted pet' + fish._id))
})

// EXPORTING ROUTES TO SERVER.JS
module.exports = router; 