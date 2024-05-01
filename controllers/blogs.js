const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', middleware.userExtractor, async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = (request.body)

    const user = request.user


    if (body.likes === undefined) body.likes = 0

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)

})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blogi = await Blog.findById(request.params.id)
    if (blogi.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'token invalid' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

module.exports = blogsRouter