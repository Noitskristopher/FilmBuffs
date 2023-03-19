const Review = require('../models/review.model');
const jwt = require('jsonwebtoken')

module.exports = {
    createReview: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            console.log(decodedJwt)
            const user_id = decodedJwt.payload._id
            console.log('USER-ID', user_id)
            const review = req.body
            review['user_id'] = user_id
            const completedReview = await Review.create(review)
            console.log(completedReview)
            res.json(completedReview)
        }
        catch (err) {
            res.status(500).json(err)
        }
        // console.log('REQ*********', req)
        // console.log('BODY*********', req.body)
        // Review.create(req.body)
        //     .then((newReview) => {
        //         res.json(newReview)
        //     })
        //     .catch((err) => {
        //         res.status(500).json(err)
        //     })
    },
    getAllReviews: (req, res) => {
        Review.find()
            .then((allReviews) => {
                res.json(allReviews)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    getAllReviewsByLoggedInUser: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            const user_id = decodedJwt.payload._id
            const allReviewsByLoggedInUser = await Review.find({ user_id: user_id })
            // console.log(allReviewsByLoggedInUser)
            res.json(allReviewsByLoggedInUser)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    getOneReview: (req, res) => {
        Review.findOne({ _id: req.params.id })
            .then((oneReview) => {
                res.json(oneReview)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    editReview: (req, res) => {
        Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((editReview) => {
                res.json(editReview)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    deleteReview: (req, res) => {
        Review.deleteOne({ _id: req.params.id })
            .then((deleteReview) => {
                res.json(deleteReview)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}