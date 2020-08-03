import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import AuthorArticles from '../Components/Author/AuthorArticles'
import AuthorInfo from '../Components/Author/AuthorInfo'

const PostTemplate = ({ data }) => {
  const [ author, setAuthor ] = useState(undefined)
  useEffect(() => {
      setAuthor(data)
  },[data])

  if(!author) return null

    return (
        <Layout>
            <div id="author">
                <AuthorInfo user={author.strapiUser} />
                <AuthorArticles user={author.strapiUser} categories={author.allStrapiCategory} />
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
        publicURL
      }
      posts {
        category
        updated_at(fromNow: true)
        slug
        title
        image {
          publicURL
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