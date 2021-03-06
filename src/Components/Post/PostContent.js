import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import CRUDbuttons from '../CRUDbuttons'

const PostContent = ({ post }) => {
    const [ key, setKey ] = useState(undefined)
    useEffect(() => {
       setKey(sessionStorage.getItem("name")) 
    }, [])
    return (
        <article>
        <section className={`${post.user.side} text-center post-header`}>
            <div className="container py-5">
                <h2 className="display-4">{post.title}</h2>
                <div className="d-flex py-5 justify-content-around">

                        <div className="row text-left">
                            <div className="col-3">
                            <img src={post.user.userImage.childImageSharp.fluid.src} className="avatar" alt={post.user.username}/>
                            </div>
                            <div className="col-9">
                            <Link to={`/author/${post.user.username}`} className="text-light text-decoration-none"><h5 className="mb-0">{post.user.username}</h5></Link>
                            <span>{post.updated_at}</span>
                            </div>
                        </div>
                        <div>
                    <h5 className="text-uppercase category bg-secondary p-2 rounded mx-auto">{post.category.catTitle}</h5>
                    </div>
                    </div>
                    {key === post.user.username ? <CRUDbuttons post={true} slug={post.slug}/> : ""}
                </div>
        </section>
            <div className="container py-4 text-center">
                <img src={post.image.publicURL} className="img-fluid" alt={post.title}/>
                <div className="mt-3 text-justify post-content">
                <ReactMarkdown source={post.content}/>
                </div>
                
            </div>
        </article>
    )
}

export default PostContent