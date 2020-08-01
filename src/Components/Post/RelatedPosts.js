import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

const RelatedPosts = ({ category }) => {
    const data = useStaticQuery(query)
    const filteredPosts = data.allStrapiPost.nodes.filter( post => post.category.catTitle === category).slice(0,3)
    console.log(filteredPosts)
    return (
        <div className="py-5">
            <h2>Articles related to: {category}</h2>
            <hr/>
            <div className="row">
                {filteredPosts.map( related => {
                    
                    return (
                        <div className="col-md-4 my-1" key={related.strapiId}>
                            <article className="related shadow rounded">
                                <Link to={`/post/${related.slug}`} className="text-dark text-decoration-none">
                                <img src={related.image.publicURL} alt={related.title} className="img-fluid rounded-top" />
                                <div className="p-3 rounded-bottom">
                                    <h4>{related.title}</h4>
                                    <div className="row">
                                        <div className="col-3 text-center px-0">
                                            <img src={related.user.userImage.publicURL} alt={related.user.username} className="avatar"/>
                                        </div>
                                        <div className="col-9 px-0">
                                            <h5 className="mb-0">{related.user.username}</h5>
                                                <h6>{related.updated_at}</h6>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </article>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const query = graphql`
{
    allStrapiPost (sort: {fields: updated_at, order: DESC}){
      nodes {
        slug
        strapiId
        title
        updated_at(fromNow: true)
        user {
          username
          userImage {
            publicURL
          }
        }
        image {
          publicURL
        }
        category {
          catTitle
        }
      }
    }
  }
`

export default RelatedPosts