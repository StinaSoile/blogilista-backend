const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    // taulukko blogeja
    // jokaiselle taulukon blogille
    // otetaan sen tykkäykset eli likes
    // lasketaan yhteen ne
    const likes = blogs.reduce((acc, curr) => {
        return acc + curr.likes
    }, 0)
    return likes
}

/**
 * 
 * @param {{likes: number, title: string, author: string}[]} blogs 
 * @returns 
 */
const favouriteBlog = (blogs) => {
    // taulukko blogeja
    // sortataan se likesin mukaan:
    // palautetaan eka blogi. 
    if (blogs.length === 0) {
        return undefined
    }
    const sortedList = [...blogs].sort((a, b) => (b.likes - a.likes))

    const favouriteBlog = sortedList[0]
    return {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        likes: favouriteBlog.likes
    }
}

/**
 * 
 * @param {{}[]}} blogs 
 * @returns
 */
const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined
    const writers = {}
    blogs.map(blog => {
        if (writers[blog.author]) writers[blog.author]++
        else writers[blog.author] = 1
    })
    const writerArray = Object.entries(writers).sort(([, a], [, b]) => b - a)

    return {
        author: writerArray[0][0],
        blogs: writerArray[0][1]
    }
}

/**
 * 
 * @param {{}[]} blogs 
 * @returns {author: string ,likes: number  }
 */
const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined
    const writers = {}
    blogs.map(blog => {
        if (writers[blog.author]) writers[blog.author] = writers[blog.author] + blog.likes
        else writers[blog.author] = blog.likes
    })
    const writerArray = Object.entries(writers).sort(([, a], [, b]) => b - a)

    return {
        author: writerArray[0][0],
        likes: writerArray[0][1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}