import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'gatsby'

import CRUDbuttons from '../CRUDbuttons'

const AuthorArticles = ({ user, categories }) => {
    const [ key, setKey ] = useState(undefined)
    useEffect(() => {
       setKey(sessionStorage.getItem("name")) 
    }, [])
    return (
        <Fragment>
            <h2 className="text-center display-4 pt-5">Articles</h2>
            <div className="container-fluid pb-3">
                <hr/>
                <div className="row">
                    {user.posts.map( post => {
                        const category = categories.nodes.filter( cat => cat.strapiId === post.category)[0]
                        return (
                            <article className="col-md-4" key={post.strapiId}>
                                <Link className="text-dark text-decoration-none" to={`/post/${post.slug}`}>
                                    <div className="shadow rounded ">
                                <img src={post.image.childImageSharp.sizes.src} alt={post.title} className="img-fluid rounded-top" />
                                <div className="p-2">
                                    <h4>{post.title}</h4>
                                        <div className="row p-2">
                                            <div className="col-6 my-auto">
                                                <h6>{post.updated_at}</h6>
                                            </div>
                                            <div className="col-6 text-center">
                                                <h5 className="text-light text-uppercase category bg-secondary p-2 rounded mx-auto">{category.catTitle}</h5>
                                            </div>
                                        </div>
                                        {key === user.username ? <CRUDbuttons post={true} slug={post.slug}/> : ""}
                                </div>
                                </div>
                                </Link>
                            </article>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default AuthorArticles;