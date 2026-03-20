const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max_blog, blog) => max_blog.likes < blog.likes ? blog : max_blog)
}

const mostBlogs = (blogs) => {
    const result = _(blogs)
        .countBy('author')
        .toPairs()
        .maxBy(1)

    if (!result) return null

    return {
        author: result[0],
        blogs: result[1]
    }

}

const mostLikes = (blogs) => {
    const result = _.maxBy(blogs, 'likes')

    if (!result) return null

    return {
        author: result.author,
        likes: result.likes
    }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}