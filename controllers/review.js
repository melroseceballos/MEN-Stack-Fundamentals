const express = require('express')
const router = express.Router()
const db = require('../models')


//  NEW ROUTE REVIEW
router.get('/:id', (req,res) => {
    console.log(req.body)
    res.render('review-form' , {
        id:req.params.id
    })
})

// CREATE ROUTE REVIEW  
router.post('/create/:id', (req,res) => {
    console.log(req.body)
    db.Fish.findByIdAndUpdate(req.params.id, {$push: {review: req.body}},
        {new: true}
        )
        .then(review =>{
            res.redirect(`/fishRoutes/${req.params.id}`);
        })
       
})

// EXPORT MODULE
module.exports = router 