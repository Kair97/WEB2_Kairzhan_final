const Review = require('../models/Review')
const Movie = require('../models/Movie')


const createReview = async (req, res) => {
    try{
        
        const {rating, comment} = req.body

        const movieId = req.params.movieId

        if(!rating || !comment) {
            return res.status(400).json({message: "Rate and comment please"})
        }

        if (rating < 1 || rating > 10) {
            return res.status(400).json({message: "Rating range is 1-10"})
        }

        const movie = await Movie.findById(movieId)
        if (!movie){
            return res.status(404).json({message: "Movie not found"})
        }

        const alreadyReviewed = await Review.findOne({
            movie: movieId,
            user: req.user._id
        })

        if (alreadyReviewed){
            return res.status(400).json({message: "You already reviewed this movie"})
        }

        const review = await Review.create({
            movie: movieId,
            user: req.user._id,
            rating, 
            comment
        })

        res.status(201).json(review)

    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const getReviewsByMovie = async (req, res) => {
    try{

        const movieId = req.params.movieId

        const reviews = await Review.find({movie: movieId})
        .populate('user', 'username')

        res.json(reviews)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    createReview,
    getReviewsByMovie
}