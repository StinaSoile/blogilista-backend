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

module.exports = {
    dummy,
    totalLikes
}