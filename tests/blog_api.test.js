const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('api-tests', async () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.blogs)
    })

    test('blogs returned as json', async () => {
        console.log('entered json-test')
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are six blogs', async () => {
        console.log('entered lkm-test')

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 6)
    })

    test('identification key is named id', async () => {
        console.log('entered id-test')
        const blogs = await api
            .get('/api/blogs')
            .expect(200)
        assert(blogs.body[0].id && !blogs.body[0]._id)

    })

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "Reactive patterns",
            author: "Pingu",
            url: "https://https.com/",
            likes: 70
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        assert.strictEqual(response.body.length, helper.blogs.length + 1)

        assert(contents.includes('Reactive patterns'))
    })

    test('an invalid blog cant be added ', async () => {
        const newBlog = {
            title: undefined,
            author: "Pingu",
            url: "https://https.com/",
            likes: 70
        }
        const newBlog2 = {
            title: "Reactive patterns",
            author: "Pingu",
            url: undefined,
            likes: 70
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.blogs.length)

        await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)

        assert.strictEqual(response.body.length, helper.blogs.length)


    })

    test('if likes are not given, likes: 0', async () => {
        const newBlog = {
            title: "Reactive patterns",
            author: "Pingu",
            url: "https://https.com/",
            likes: undefined
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.likes)

        assert.strictEqual(response.body.length, helper.blogs.length + 1)
        assert(!contents.includes(undefined))
    })

    test('blog can be changed', async () => {
        const blogsAtStart = await helper.blogsFromDB()

        const blogToChange = blogsAtStart[0]
        const change = {
            title: "Title",
            author: "Pingu",
            url: "https://https.com/",
            likes: 30
        }
        // console.log(blogsAtStart)
        const resultBlog = await api
            .put(`/api/blogs/${blogToChange.id}`)
            .send(change)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsFromDB()
        // console.log(blogsAtEnd)
        assert.deepStrictEqual(resultBlog.body, { ...change, id: blogToChange.id })
    })

    test('blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsFromDB()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)


        const blogsAtEnd = await helper.blogsFromDB()
        const contents = blogsAtEnd.map(r => r.id)
        assert(!contents.includes(blogToDelete.id))

        assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
    })


    after(async () => {
        console.log('not closing')
        await mongoose.connection.close(true)
        console.log('after closing')

    })
})
