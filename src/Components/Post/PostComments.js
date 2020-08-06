import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import CommentForm from './CommentForm'
import CRUDbuttons from '../CRUDbuttons'
import EditComment from './EditComment'

const PostComment = ({ comments, users, postID, slug }) => {
    const [ state, setState ] = useState({
        editing:false,
        key: undefined
    })

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            key:sessionStorage.getItem("name")
        }))
     }, [])

    const toggleEdit = () => {
        setState((prevState) => ({
            ...prevState,
            editing:true
        }))
    }

    if(comments.length){
        return (
            <div>
                <h2>Comments</h2>
                <hr/>
                <CommentForm postID={postID} slug={slug}/>
                {comments.map( comment => {
                    const user = users.filter( user => user.strapiId === comment.user)[0]
                    return (
                        <div key={comment.id} className="row py-1">
                            <div className="col-md-1 col-2">
                                <img src={user.userImage.childImageSharp.fluid.src} className="avatar" alt={user.username}/>
                            </div>
                            <div className=" col-md-7 col-7">
                                <div className="d-flex">
                                <Link to={`/author/${user.username}`} className="text-dark text-decoration-none"><h5 className="mb-0">{user.username}</h5></Link>
                                <span className="text-muted pl-2">{comment.updated_at}</span>
                                </div>
                                <p>{comment.commentBody}</p>
                            </div>
                            <div className="col-md-4 col-3">
                                {state.key === user.username && !state.editing ? <CRUDbuttons comment={true} toggle={toggleEdit}/> : ""}
                            </div>
                            <div className="col-12">
                                {state.editing && state.key === user.username ? <EditComment comment={comment} slug={slug}/> : ""}
                        </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return (
            <div>
                <h2>Comments</h2>
                <hr/>
                <CommentForm postID={postID} slug={slug}/>
                    <h3>No Comments</h3>
            </div>
        )
    }
    
}

export default PostComment