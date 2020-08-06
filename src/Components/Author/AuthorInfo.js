import React, { useState, useEffect } from 'react'

import CRUDbuttons from '../CRUDbuttons'
import EditProfile from './EditProfile'

const AuthorInfo = ({ user }) => {
    const [state, setState ] = useState({
        key:undefined,
        editing:false
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

    return (
        <div className={`${user.side}`}>
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
            {state.key === user.username && !state.editing ? <CRUDbuttons author={true} toggle={toggleEdit}/> : ""}
            {state.editing ? <EditProfile user={user} /> : ""}
            </div>
        </div>
    )
}

export default AuthorInfo;