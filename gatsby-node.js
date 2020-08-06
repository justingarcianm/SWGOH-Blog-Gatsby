const path = require('path')

// Create pages Dynamically
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
    {
        allStrapiPost {
          nodes {
            slug
            title
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
    result.data.allStrapiPost.nodes.forEach( post => {
        createPage({
            path:`/edit/${post.slug}`,
            component: path.resolve('src/templates/editPost-template.js'),
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
// test more!!!!
    result.data.allStrapiUser.nodes.forEach( user => {
      createPage({
        path:`/search/${user.username}`,
        component: path.resolve('src/templates/search-template.js'),
        context: {
          username: user.username
        }
      })
    })
    result.data.allStrapiPost.nodes.forEach( post => {
      createPage({
        path:`/search/${post.title}`,
        component: path.resolve('src/templates/search-template.js'),
        context: {
          username: post.title
        }
      })
    })
}


