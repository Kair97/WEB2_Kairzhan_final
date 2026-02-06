const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')
const {
    createMovie, 
    getMovies, 
    getMovieById,
    updateMovie, 
    deleteMovie,
    searchMovieExternal
} = require('../controllers/movieController')

router.get('/external/search', searchMovieExternal)
router.post('/', protect, createMovie)
router.get('/', getMovies)
router.get('/:id', getMovieById)
router.put('/:id', protect, updateMovie)
router.delete('/:id', protect, deleteMovie)


module.exports = router