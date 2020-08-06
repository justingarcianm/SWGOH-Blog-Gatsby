import React, { Fragment } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import  Featured from './Featured'

const Hero = () => {
    const data = useStaticQuery(query)
    const { heroTitle, heroSubtitle, heroImage } = data.allStrapiBanner.edges[0].node
    return (
        <Fragment>
            <div id="hero" style={{backgroundImage:`url('${heroImage.childImageSharp.fluid.src}')`}} className="text-light text-center">
                <div className="container pt-5">
                <h1 className="display-2 pt-5">{heroTitle}</h1>
                                <h2 className="pt-2">{heroSubtitle}</h2>
                </div>
            </div>
            <Featured/>
        </Fragment>
        
    )
}

export const query = graphql`
{
  allStrapiBanner {
    edges {
      node {
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2400, toFormat: JPG) {
              src
            }
          }
        }
        heroSubtitle
        heroTitle
      }
    }
  }
}
`

export default Hero