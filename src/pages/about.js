import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import MarkDown from 'react-markdown'
import { FaApple, FaGooglePlay} from 'react-icons/fa'

import Layout from '../layouts/layout'
import SEO from "../Components/seo"


const About = () => {
    const data = useStaticQuery(query)
    return (
        <Layout>
          <SEO pageTitle={`About`} desc={`Learn why I created this page!`} />
        <div className="container">
            <h2 className="text-center display-2 my-5">About the HoloTable</h2>
           
            <MarkDown source={data.allStrapiAbout.edges[0].node.aboutContent}/>
            
            <div class="embed-responsive embed-responsive-16by9 mb-4">
            <iframe title="about video" src={`https://www.youtube.com/embed/${data.allStrapiAbout.edges[0].node.youtubeId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
            <h2 className="display-3 text-center">
                            Download the app Today!
                        </h2>
                        <div className="row text-center py-5">
                            <div className="col-md-3"></div>
                            <div className="col-md-3 mt-1">
                                <a href="https://apps.apple.com/us/app/star-wars-galaxy-of-heroes/id921022358" target="_blank" rel="noopener noreferrer" className="btn btn-dark"> <FaApple></FaApple> <span>Apple Store</span></a>
                            </div>
                            <div className="col-md-3 mt-1">
                            <a href="https://play.google.com/store/apps/details?id=com.ea.game.starwarscapital_row&hl=en_US" target="_blank" rel="noopener noreferrer" className="btn btn-dark"> <FaGooglePlay></FaGooglePlay> <span>Google Play</span>  </a>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
        </div>
        </Layout>
    )
}

export const query = graphql`
{
    allStrapiAbout {
      edges {
        node {
          aboutContent
          youtubeId
        }
      }
    }
  }
`

export default About