const express = require('express')
const router = express.Router()
const db = require('../models')

// FLATLIST
router.get('/', (req, res) => {
    db.Fish.find({}, { reviews: true, _id: false })
        .then(reviews => {
            // const flatList = []
            // for(let review of reviews) {
            //     flatList.push(...review.reviews)
            // }
            res.json(reviews)
        })
})
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