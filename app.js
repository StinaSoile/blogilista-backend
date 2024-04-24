const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

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