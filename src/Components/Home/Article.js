import React from 'react'
import { Link } from 'gatsby'

const Article = props => {
    const { title, content, user, image, category, updated_at, id, slug } = props.post
    return (
        <article className="article-main pb-3" key={id}>
            <div className="row">
                <div className="col-md-8">
                <h5 className="text-muted text-uppercase category">{category.catTitle}</h5>
                <Link to={`/post/${slug}`} className="text-dark text-decoration-none"><h3>{title}</h3></Link>
                    <p className="text-truncate mb-1">{content}</p>
                    <div className="d-flex ">
                    <Link to="/" className="text-dark text-decoration-none"><h5 className="mb-0">{user.username}</h5></Link>
                        <span className="text-muted pl-2">{updated_at}</span>
                    </div>
                   
                </div>
                <div className="col-md-4">
                <Link to={`/post/${slug}`}><img src={image.publicURL} className="img-fluid" alt={title}/></Link>
                </div>
            </div>
        </article>
    )
}

export default Article
