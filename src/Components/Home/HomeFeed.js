import React, { Fragment } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Article from './Article'

const HomeFeed = () => {
    const data = useStaticQuery(query)
    return (
        <Fragment>
            <h2 className="display-4">Latest Articles</h2>
            <hr/>
            <div className="HomeFeed">
                    {data.allStrapiPost.edges.map( post => <Article post={post} key={post.id} /> )}
            </div>
        </Fragment>
        
    )
}

export const query = graphql`
{
    allStrapiPost(limit: 10) {
      edges {
        node {
          content
          id
          updated_at(fromNow: true)
          title
          strapiId
          user {
            username
          }
          category {
            catTitle
          }
          image {
            publicURL
          }
        }
      }
    }
  }
`

export default HomeFeed
