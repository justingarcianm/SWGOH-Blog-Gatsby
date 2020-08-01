import React, { Fragment } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const ResourceLinks = () => {
    const data = useStaticQuery(query)
    return (
        <Fragment>
            <h2>Resources</h2>
            <ol>
            {data.allStrapiResourceLink.edges.map( link => {
                return (
                    <li key={link.node.strapiId}>
                        <a href={link.node.linkUrl} target="_blank" rel="noreferrer" className="text-black-50 text-decoration-none"><span>0{link.node.strapiId}</span>  {link.node.linkTitle}</a>
                    </li>
                )
            })}
            </ol>
        </Fragment>
        
    )
}

export const query = graphql`
{
    allStrapiResourceLink {
      edges {
        node {
          linkUrl
          linkTitle
          strapiId
        }
      }
    }
  }
`

export default ResourceLinks
