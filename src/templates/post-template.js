import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import PostContent from '../Components/Post/PostContent'
import PostComments from '../Components/Post/PostComments'
import RelatedPosts from '../Components/Post/RelatedPosts'

const PostTemplate = ({ data }) => {
    const [ state, setState ] = useState({
      post:undefined,
      deleted:undefined,
      updated:undefined
    })
    useEffect(() => {
      setState((prevState) => ({
        ...prevState,
        post:data,
      deleted:window.history.state.deleteMsg,
      updated:window.history.state.updateMsg
    }))
    },[data,window.history.state.updateMsg, window.history.state.deleteMsg])
      if(!state.post) return null
    return (
        <Layout>
            <div id="post">
            {state.updated || state.deleted ? <div className="bg-info p-2 text-center">
            <h5 className="text-light">{state.updated || state.deleted}</h5>
          </div> : ""}
            <PostContent post={state.post.strapiPost} />
            <div className="container">
                <PostComments comments={state.post.strapiPost.comments} users={state.post.allStrapiUser.nodes} postID={state.post.strapiPost.strapiId} slug={state.post.strapiPost.slug}/>
                <RelatedPosts category={state.post.strapiPost.category.catTitle} />
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