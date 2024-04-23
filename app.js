const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app
/* Tee sovelluksesta toimiva npm-projekti. 
Jotta sovelluskehitys olisi sujuvaa, konfiguroi sovellus suoritettavaksi nodemonilla. 
Voit luoda sovellukselle uuden tietokannan MongoDB Atlasiin 
tai käyttää edellisen osan sovelluksen tietokantaa.

Varmista, että sovellukseen on mahdollista lisätä blogeja 
Postmanilla tai VS Code REST Clientilla ja että sovellus näyttää lisätyt blogit. */

/* 4.2 blogilista, step2

Jaa sovelluksen koodi tämän osan alun tapaan useaan moduuliin. */