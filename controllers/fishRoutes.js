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
            res.render('fishDetails', {
                Fish: fish
           })
        })
        .catch(() => res.render('404'))
})

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    db.Fish.findById(req.params.id)
        .then(pet => {
            res.render('edit-form', {
                fish: fish
            })
        })
})

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    db.Fish.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(fish => res.redirect('/fishRoutes/' + fish._id))
})

// DESTROY ROUTE
router.delete('/:id', (req,res)=>{
    db.Fish.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/fishRoutes'))
})

// PURCHASE ROUTE
router.put('/:id/purchase',(req,res) => {
    db.Fish.findByIdAndUpdate(req.params.id,
    {$inc: { quantity: -1 }},
    {new: true})
    .then(() => res.redirect('/fishRoutes/'))
    });

// EXPORTING ROUTES TO SERVER.JS
module.exports = router; 