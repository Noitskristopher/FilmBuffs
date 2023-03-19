const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    filmName: {
        type: String,
        required: [true, 'Film name is required'],
    },
    rating: {
        type: Number,
        required: [true, 'Film Rating is required'],
        min: [0, 'Rating must be 0 or more'],
        max: [10, 'Rating must be less than 10']
    },
    review: {
        type: String,
        required: [true, 'Film Review is required'],
        minLength: [5, 'Film Review must be more than 5 characters']
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Review = mongoose.model('Film', ReviewSchema);
module.exports = Review;
