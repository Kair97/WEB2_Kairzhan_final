const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
    createReview,
    getReviewsByMovie,
    deleteReview
} = require('../controllers/reviewController')

router.post('/:movieId', protect, createReview)
router.delete('/:id', protect, deleteReview)
router.get('/:movieId', getReviewsByMovie)

module.exports = router