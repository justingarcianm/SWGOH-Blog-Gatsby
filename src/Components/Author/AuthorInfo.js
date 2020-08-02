import React from 'react'

const AuthorInfo = ({ user }) => {
    return (
        <div className={`${user.side.toLowerCase()}`}>
            <div className="container py-5">
                <div className="row">
                <div className="col-md-6 my-auto col-8">
                    <h2 className="display-3">{user.username}</h2>
                        <h3>{user.tagline}</h3>
                            <h5>Joined: {user.created_at}</h5>
                </div>
                <div className="col-md-6 text-center col-4">
                    <img src={user.userImage.publicURL} alt={user.username} className="rounded-circle img-fluid author-image" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default AuthorInfo;