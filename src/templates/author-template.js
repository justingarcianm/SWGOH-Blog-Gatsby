import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import AuthorArticles from '../Components/Author/AuthorArticles'
import AuthorInfo from '../Components/Author/AuthorInfo'
import SEO from '../Components/seo'

const PostTemplate = ({ data }) => {
  const [ state, setState ] = useState({
    author:undefined,
    deleteMsg:undefined,
    createMsg:undefined
  })
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      author: data,
      deleteMsg:window.history.state.deleteMsg,
      createMsg:window.history.state.createMsg
  }))

  },[data])

  if(!state.author) return null

    return (
        <Layout>
          <SEO pageTitle={`${state.author.strapiUser.username}'s Profile`} desc={`See this Authors profile and posts!`} />
          {state.deleteMsg || state.createMsg ? <div className="bg-info p-2 text-center">
            <h5 className="text-light">{state.deleteMsg || state.createMsg }</h5>
          </div> : ""}
            <div id="author">
                <AuthorInfo user={state.author.strapiUser} />
                <AuthorArticles user={state.author.strapiUser} categories={state.author.allStrapiCategory} />
            </div>
        </Layout>
    )
}

export const query = graphql`
query ($username: String!) {
  strapiUser(username: {eq: $username}) {
    strapiId
    username
    side
    tagline
    userImage {
      childImageSharp {
        sizes(maxWidth: 500) {
          src
        }
      }
    }
    posts {
      category
      updated_at(fromNow: true)
      slug
      title
      image {
        childImageSharp {
          sizes(maxWidth: 700) {
            src
          }
        }
      }
    }
    created_at(fromNow: true)
  }
  allStrapiCategory {
    nodes {
      catTitle
      strapiId
    }
  }
}
`

export default PostTemplate