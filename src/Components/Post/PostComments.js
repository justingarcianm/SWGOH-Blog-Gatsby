import React from 'react'
import { Link } from 'gatsby'

import CommentForm from './CommentForm'

const PostComment = ({ comments, users }) => {
    if(comments.length){
        return (
            <div>
                <h2>Comments</h2>
                <hr/>
                <CommentForm />
                {comments.map( comment => {
                    const user = users.filter( user => user.strapiId === comment.user)[0]
                    return (
                        <div key={comment.id} className="row py-1">
                            <div className="col-md-1 col-2">
                                <img src={user.userImage.publicURL} className="avatar" alt={user.username}/>
                            </div>
                            <div className=" col-md-11 col-10">
                                <div className="d-flex">
                                <Link to={`/author/${user.username}`} className="text-dark text-decoration-none"><h5 className="mb-0">{user.username}</h5></Link>
                                <span className="text-muted pl-2">{comment.updated_at}</span>
                                </div>
                                <p>{comment.commentBody}</p>
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
                <CommentForm />
                    <h3>No Comments</h3>
            </div>
        )
    }
    
}

export default PostComment