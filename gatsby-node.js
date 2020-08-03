const path = require('path')
const { useReducer } = require('react')

// Create pages Dynamically
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
    {
        allStrapiPost {
          nodes {
            slug
          }
        }
        allStrapiUser {
          nodes {
            username
          }
        }
      }
    `)

    result.data.allStrapiPost.nodes.forEach( post => {
        createPage({
            path:`/post/${post.slug}`,
            component: path.resolve('src/templates/post-template.js'),
            context: {
                slug: post.slug
            }
        })
    })

    result.data.allStrapiUser.nodes.forEach( user => {
      createPage({
        path:`/author/${user.username}`,
        component: path.resolve('src/templates/author-template.js'),
        context: {
          username: user.username
        }
      })
    })
}