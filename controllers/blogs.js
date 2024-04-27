const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
/* 
4.18:
Toteuta (osan 4 luvun "Token-perustainen kirjautuminen" tapaan)
järjestelmän token-perustainen autentikointi

4.19:
Muuta blogien lisäämistä siten, että se on mahdollista vain, jos
HTTP POST-pyynnössä on mukana validi token. Tokenin haltija on blogin lisääjä.
*/4.17:
Laajenna blogia siten, että blogiin tulee tieto sen lisänneestä käyttäjästä.DONE

Muokkaa blogien lisäystä osan 4 luvun populate tapaan siten, että blogin lisäämisen yhteydessä 
määritellään blogin lisääjäksi joku järjestelmän tietokannassa olevista käyttäjistä
    (esim.ensimmäisenä löytyvä). 
Tässä vaiheessa ei ole väliä kuka käyttäjistä määritellään lisääväksi. 
Toiminnallisuus viimeistellään tehtävässä 4.19.
    DONE

Muokkaa kaikkien blogien listausta siten, että blogien yhteydessä näytetään lisääjän tiedot,
    ja käyttäjien listausta siten että käyttäjien lisäämät blogit ovat näkyvillä DONE


blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const body = (request.body)
    if (body.likes === undefined) body.likes = 0
    const user = await User.findById('662bfd6866f8cfcadc207dcb')

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

blogsRouter.put('/:id', async (request, response) => {
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

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter