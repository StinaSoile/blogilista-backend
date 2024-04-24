const { test, describe } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/list_helper')
const helper = require('./test_helper')


describe('total likes', () => {

    const noBlogs = helper.noBlogs
    const oneBlog = helper.oneBlog
    const blogs = helper.blogs

    test('of array with one blog is calculated right', () => {
        const result = totalLikes(oneBlog)
        assert.strictEqual(result, 7)
    })

    test('of array of many blogs is calculated right', () => {
        const result = totalLikes(blogs)
        assert.strictEqual(result, 36)
    })

    test('of array with no blogs is zero', () => {
        const result = totalLikes(noBlogs)
        assert.strictEqual(result, 0)
    })
})