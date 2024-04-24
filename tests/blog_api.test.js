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

    // helpoin tapa mutta jätän Promise.all-version muistutukseksi:

    // beforeEach(async () => {
    //     await Note.deleteMany({})

    //     await Note.insertMany(helper.initialNotes)
    // })


    // 4.8: testit GET-pyynnölle /api/blogs
    // testaa, että:
    // palauttaa JSON-muodossa
    // palauttaa oikean määrän
    // refaktoroi promiset asynciksi
    // MUISTA määritellä testausympäristö ym muutokset

    test('blogs returned as json', async () => {
        console.log('entered test')
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    // test('there are two blogs', async () => {
    //     const response = await api.get('/api/blogs')

    //     assert.strictEqual(response.body.length, 2)
    // })

    // test('the first note is a song', async () => {
    //     const response = await api.get('/api/notes')

    //     const contents = response.body.map(e => e.content)
    //     assert(contents.includes('Rati riti ralla.'))
    // })

    // test('a valid note can be added ', async () => {
    //     const newNote = {
    //         content: 'async/await simplifies making async calls',
    //         important: true,
    //     }

    //     await api
    //         .post('/api/notes')
    //         .send(newNote)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     const response = await api.get('/api/notes')

    //     const contents = response.body.map(r => r.content)

    //     assert.strictEqual(response.body.length, helper.initialNotes.length + 1)

    //     assert(contents.includes('async/await simplifies making async calls'))
    // })

    // test('note without content is not added', async () => {
    //     const newNote = {
    //         important: true
    //     }

    //     await api
    //         .post('/api/notes')
    //         .send(newNote)
    //         .expect(400)

    //     const response = await api.get('/api/notes')
    //     assert.strictEqual(response.body.length, helper.initialNotes.length)
    // })

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
