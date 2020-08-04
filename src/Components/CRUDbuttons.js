import React, { Fragment, useState } from 'react'
import { Link } from 'gatsby'

const CRUDbuttons = props => {

    const [state, setState] = useState({
        editPost:false,
        editComment:false
    })

    const handleClick = event => {
        const { name } = event.target
        event.preventDefault()
        setState((prevState) => ({
            ...prevState,
            [name]: !state.name
        }))
        props.toggle()
    }

    if(props.author) {
        return (
                <div className="d-flex">
                <Link className="btn btn-success m-1" to='/create/'>New Post</Link>
                <button className="btn btn-warning m-1" onClick={handleClick} >Edit Profile</button>
                </div>
        )
    }
    if(props.home) {
        return <Link className="btn btn-success" to='/create/'>New Post</Link>
    }
    if(props.post) {
        return <Link className="btn btn-warning" to={`/edit/${props.slug}`} name="editPost">Edit Post</Link>
    }
    if(props.comment) {
        return (
            <Fragment>
                <button className="btn btn-warning" onClick={handleClick} name="editComment">EDIT</button>
            </Fragment>
        )
    }
    return <p>Wrong place!</p>
}

export default CRUDbuttons