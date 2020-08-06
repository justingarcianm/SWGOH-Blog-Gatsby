import React, { Fragment, useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Article from './Article'
import CRUDbuttons from '../CRUDbuttons'

const HomeFeed = () => {
  const [key, setKey] = useState(undefined)
  useEffect(() => {
    setKey(sessionStorage.getItem("user"))
  },[])
    const data = useStaticQuery(query)
    return (
        <Fragment>
          <div className="d-flex align-items-center">
          <h2 className="display-4">Latest Articles</h2>
          <div className="ml-auto">
          {key ? <CRUDbuttons home={true} /> : ""}
          </div>
          
          </div>
            
            <hr/>
            <div className="HomeFeed">
                    {data.allStrapiPost.edges.map( post => <Article post={post.node} key={post.id} /> )}
            </div>
        </Fragment>
        
    )
}

export const query = graphql`
{
  allStrapiPost(sort: {fields: created_at, order: DESC}) {
    edges {
      node {
        content
        slug
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
          childImageSharp {
            id
            sizes(maxWidth: 600) {
              src
            }
          }
        }
      }
    }
  }
}
`

export default HomeFeed
