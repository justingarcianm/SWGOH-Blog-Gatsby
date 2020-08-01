const path = require('path')

// Create pages Dynamically
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogTemplate = path.resolve('src/templates/post-template.js')
    const result = await graphql(`
    {
        allStrapiPost {
          nodes {
            slug
          }
        }
      }
    `)

    result.data.allStrapiPost.nodes.forEach( post => {
        createPage({
            path:`/post/${post.slug}`,
            component: blogTemplate,
            context: {
                slug: post.slug
            }
        })
    })
}