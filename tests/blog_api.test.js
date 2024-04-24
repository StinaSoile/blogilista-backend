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

        // const blogObjects = helper.blogs
        //     .map(blog => new Blog(blog))
        // const promiseArray = blogObjects.map(blog => blog.save())
        // await Promise.all(promiseArray)
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

        // .expect('Content-Type', /application\/json/)
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

    // 4.11 jos likes ei määritellä, likes:0

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
        // NÄMÄ ALLA OLEVAT EI TOIMI!
        // const foundBlog = contents.find(({ title }) === "Reactive patterns")
        // assert.strictEqual(foundBlog.likes, 0)
        assert(!contents.includes(undefined))
    })

    // test('a specific note can be viewed', async () => {
    //     const notesAtStart = await helper.notesInDb()

    //     const noteToView = notesAtStart[0]


    //     const resultNote = await api
    //         .get(`/api/notes/${noteToView.id}`)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/)

    //     assert.deepStrictEqual(resultNote.body, noteToView)
    // })

    // test('a note can be deleted', async () => {
    //     const notesAtStart = await helper.notesInDb()
    //     const noteToDelete = notesAtStart[0]


    //     await api
    //         .delete(`/api/notes/${noteToDelete.id}`)
    //         .expect(204)

    //     const notesAtEnd = await helper.notesInDb()

    //     const contents = notesAtEnd.map(r => r.content)
    //     assert(!contents.includes(noteToDelete.content))

    //     assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    // })
    after(async () => {
        console.log('closing')
        await mongoose.connection.close()
    })
})
