const path = require('path')

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
}

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /bad-module/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }

