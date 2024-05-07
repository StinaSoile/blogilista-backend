const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

testingRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})

// testingRouter.get('/', async (request, response) => {
//     const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
//     response.json(users)
// })

module.exports = testingRouter