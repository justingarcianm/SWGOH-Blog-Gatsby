import React from 'react'
import { Link } from 'gatsby'
import { graphql, useStaticQuery } from 'gatsby'

const Featured = () => {
    const data = useStaticQuery(query)
    const { content, strapiId, title, updated_at, user, category, image, slug } = data.strapiPost
    return (
        <div id="featured">
            <div className="container">
                <div className="row shadow rounded-lg bg-light">
                    <div className="col-md-6 px-0">
                        <Link to={`/post/${slug}`}>
                        <img src={image.publicURL} className="img-fluid rounded-left" alt={title}/>
                        </Link>
                    </div>
                    <div className="col-md-6 my-auto px-5">
                        <h5 className="text-muted text-uppercase category">{category.catTitle}</h5>
                        <Link to={`/post/${slug}`} className="text-dark text-decoration-none"><h3>{title}</h3></Link>
                                <p className="text-truncate">{content}</p>
                                <div className="row">
                                    <div className="col-2">
                                    <img src={user.userImage.publicURL} className="avatar" alt={user.username}/>
                                    </div>
                                    <div className="col-10 px-0">
                                        <Link to={`/author/${user.username}`} className="text-dark text-decoration-none"><h5>{user.username}</h5></Link>
                                            <h6 className="text-muted">{updated_at}</h6>
                                    </div>
                                </div>
                            
                    </div>
                </div>
            </div>
            <h2 className="text-center display-3 pt-3 text-uppercase">Featured Post</h2>
        </div>
    )
}

export const query = graphql`
{
    strapiPost(featured: {eq: true}) {
      content
      strapiId
      title
      slug
      image {
        publicURL
      }
      updated_at(fromNow: true)
      user {
        username
        userImage {
          publicURL
        }
      }
      category {
        catTitle
      }
    }
  }
`

export default Featured