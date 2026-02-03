const express = require('express')

const app = express()

const errorHandler = require('./middleware/errorMiddleware')

app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/movies', require('./routes/movieRoutes'))

app.use('/api/reviews', require('./routes/reviewRoutes'))

app.get("/", (req, res)=>{
    res.send("Movie API is running")
});

app.use(errorHandler)

module.exports = app    