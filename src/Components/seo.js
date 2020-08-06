import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const SEO = ({ pageTitle, desc }) => {
    const data = useStaticQuery(query)
    const { title, description } = data.allSite.nodes[0].siteMetadata
    return (
        <Helmet htmlAttributes={{lang:'en'}} title={`${pageTitle || title}`}>
            <meta name="description" content={` ${desc} || ${description} `} />
        </Helmet>
    )
}

export const query = graphql`
{
    allSite {
      nodes {
        siteMetadata {
          author
          description
          siteUrl
          title
        }
      }
    }
  }
`

export default SEO