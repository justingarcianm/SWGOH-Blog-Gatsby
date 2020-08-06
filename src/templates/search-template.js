import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'

const PostTemplate = () => {

    return (
        <Layout>
            <div id="search">
                <h2>Search Results</h2>
            </div>
        </Layout>
    )
}

// export const query = graphql`
// query ($slug: String!) {
//     strapiPost(slug: {eq: $slug}) {
//       title
//       strapiId
//       content
//       slug
//       updated_at(fromNow: true)
//       user {
//         username
//         userImage {
//           publicURL
//         }
//         side
//         id
//       }
//       image {
//         publicURL
//       }
//       comments {
//         commentBody
//         updated_at(fromNow: true)
//         user
//         id
//       }
//       category {
//         catTitle
//       }
//     }
//     allStrapiUser {
//       nodes {
//         strapiId
//         userImage {
//           publicURL
//         }
//         username
//       }
//     }
//   }
// `

export default PostTemplate