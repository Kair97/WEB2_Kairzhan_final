const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
    createReview,
    getReviewsByMovie
} = require('../controllers/reviewController')

router.post('/:movieId', protect, createReview)
router.get('/:movieId', getReviewsByMovie)

module.exports = router