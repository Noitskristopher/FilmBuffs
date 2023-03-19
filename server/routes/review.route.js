const FilmController = require('../controllers/film.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/getAllReviews', FilmController.getAllReviews)
    app.post('/api/postReview', authenticate, FilmController.createReview)
    app.get('/api/getOneReview/:id', FilmController.getOneReview)
    app.get('/api/reviewsByLoggedInUser', authenticate, FilmController.getAllReviewsByLoggedInUser)
    app.put('/api/editReview/:id', FilmController.editReview)
    app.delete('/api/deleteReview/:id', FilmController.deleteReview)
}