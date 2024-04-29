const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')



const logger = require('./utils/logger')
mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
// app.use(middleware)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

// app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)
// app.use('/api/blogs', middleware.userExtractor, middleware.tokenExtractor, blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)



// const PORT = 3003
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

module.exports = app