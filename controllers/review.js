const express = require('express')
const router = express.Router()
const db = require('../models')


//  NEW ROUTE REVIEW
router.get('/new/:fishId', (req,res => {
    db.Fish.findById(req.params.fishId)
    .then( product => {
        res.render('reviews/new-review', {Fish: fish})
    })
}))

// CREATE ROUTE REVIEW  
router.post('/create/:productId', (req,res) => {
    db.Fish.findByIdAndUpdate(req.params.fishId, {$push: {review: req.body}},
        {new: true}
        )
        .then(fish => {
            res.redirect('/fishRoutes' + fish._id)
        })
})

// EXPORT MODULE
module.exports = router 