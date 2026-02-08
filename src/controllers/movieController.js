const Movie = require('../models/Movie')
const Review = require('../models/Review')
const axios = require('axios')

const createMovie = async (req, res, next) => {
    try{

        const {title, description, trailerUrl} = req.body

        if (!title || !description){
            res.status(400)
            throw new Error('Title and description are required')
        }

        const movie = await Movie.create({
            title, 
            description, 
            trailerUrl,
            createdBy: req.user._id
        }) 
        
        res.status(201).json({message: "Movie successfully created"})
        
    }catch(error){
        next(error)
    }
}

const getMovies = async (req, res) => {

    try{

        const movies = await Movie.find().populate('createdBy', 'username')

        res.json(movies)

    }catch(error){
        res.status(400).json({message: error.message})
    }

}

const getMovieById = async (req, res) =>{
    try{
        
        const movie = await Movie.findById(req.params.id).populate('createdBy', 'username')

        if(!movie){
            return res.status(404).json({
                message: 'Movide not found'
            })
        }

        const reviews = await Review.find({movie: movie._id})

        const reviewsCount = reviews.length
        const averageRating = 
            reviewsCount === 0 ? 0 : reviews.reduce((sum, r  ) => sum + r.rating, 0) / reviewsCount

        res.json({
            movie,
            reviewsCount, 
            averageRating: Number(averageRating.toFixed(1))
        })
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const updateMovie = async (req, res) =>{
    try{    

        const movie = await Movie.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({message: "Movie not found"})
        }

        if (movie.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"Not allowed for you"})
        }

        movie.title = req.body.title || movie.title
        movie.description = req.body.description || movie.description
        movie.trailerUrl = req.body.trailerUrl || movie.trailerUrl

        const updMovie = await movie.save()

        res.status(200).json({message: "successfully updated", updMovie})

    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const patchupdateMovie = async (req, res) =>{
    try{    

        const movie = await Movie.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({message: "Movie not found"})
        }

        if (movie.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"Not allowed for you"})
        }

        movie.title = req.body.title || movie.title
        movie.description = req.body.description || movie.description
        movie.trailerUrl = req.body.trailerUrl || movie.trailerUrl

        const updMovie = await movie.save()

        res.status(200).json({message: "successfully updated", updMovie})

    }catch(error){
        res.status(400).json({message: error.message})
    }
}


const deleteMovie = async (req, res) => {
    try{

        const movie = await Movie.findById(req.params.id)

        if (!movie){
            return res.status(404).json({message: "Movie not found"})
        }

        if(movie.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "Not allowed"})
        }

        await movie.deleteOne()

        res.json({message: "Movie deleted successfully"})
        
    }catch(error){
        res.status(400).json(error.message)
    }
}

const searchMovieExternal = async (req, res, next) =>{
    try{

        const title = req.query.title

        if (!title) {
            res.status(400)
            throw new Error('Movie title is required bro')
        }

        const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`
        )

        if (response.data.Response === 'False'){
            return res.status(404).json({message: 'Movie not found'})
        }

        res.json({
            title: response.data.Title,
            year: response.data.Year,
            genre: response.data.Genre,
            poster: response.data.Poster,
            imdbRating: response.data.imdbRating,
            plot: response.data.Plot
        })

    }catch(error){
        next(error)
    }
}


module.exports = {createMovie, getMovies, getMovieById, updateMovie, deleteMovie, patchupdateMovie, searchMovieExternal}