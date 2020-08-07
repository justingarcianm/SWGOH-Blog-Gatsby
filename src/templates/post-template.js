import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import PostContent from '../Components/Post/PostContent'
import PostComments from '../Components/Post/PostComments'
import RelatedPosts from '../Components/Post/RelatedPosts'
import SEO from '../Components/seo'

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
    },[])
      if(!state.post) return null
    return (
        <Layout>
          <SEO pageTitle={`${state.post.strapiPost.title}`} desc={`Read through this post!`} />
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
    image {
      publicURL
    }
    title
    updated_at(fromNow: true)
    strapiId
    content
    slug
    user {
      username
      userImage {
        childImageSharp {
          fluid(maxWidth: 200) {
            src
          }
        }
      }
      side
      id
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
      username
      userImage {
        childImageSharp {
          fluid(maxWidth: 200) {
            src
          }
        }
      }
    }
  }
}
`

export default PostTemplate