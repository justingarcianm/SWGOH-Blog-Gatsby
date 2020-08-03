import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import PostContent from '../Components/Post/PostContent'
import PostComments from '../Components/Post/PostComments'
import RelatedPosts from '../Components/Post/RelatedPosts'

const PostTemplate = ({ data }) => {
    return (
        <Layout>
            <div id="post">
            <PostContent post={data.strapiPost} />
            <div className="container">
                <PostComments comments={data.strapiPost.comments} users={data.allStrapiUser.nodes} postID={data.strapiPost.strapiId} />
                <RelatedPosts category={data.strapiPost.category.catTitle} />
            </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query ($slug: String!) {
    strapiPost(slug: {eq: $slug}) {
      title
      strapiId
      content
      slug
      updated_at(fromNow: true)
      user {
        username
        userImage {
          publicURL
        }
        side
        id
      }
      image {
        publicURL
      }
      comments {
        commentBody
        updated_at(fromNow: true)
        user
        id
      }
      category {
        catTitle
      }
    }
    allStrapiUser {
      nodes {
        strapiId
        userImage {
          publicURL
        }
        username
      }
    }
  }
`

export default PostTemplate