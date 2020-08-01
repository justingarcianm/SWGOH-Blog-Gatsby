import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'

const PostTemplate = ({ data }) => {
    return (
        <Layout>
            <div id="author">
                <h2>Author Page</h2>
                </div>
        </Layout>
    )
}

// export const query = graphql`
// query ($username: String!) {
//     strapiUser(username: {eq: $username}) {
//       title
//       strapiId
//       content
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