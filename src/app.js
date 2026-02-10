const express = require('express')
const path = require('path');

const app = express()

const errorHandler = require('./middleware/errorMiddleware')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/authRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/movies', require('./routes/movieRoutes'))

app.use('/api/reviews', require('./routes/reviewRoutes'))


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.use(errorHandler)

module.exports = app    