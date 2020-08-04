import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentForm = ({ postID }) => {
    const [ state, setState ] = useState({
        comment:'',
        error:false,
        key:undefined,
        id:undefined
    })
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            key:sessionStorage.getItem("user"),
            id:sessionStorage.getItem("id")
        }))
    }, [])
    const config = {
        headers: { Authorization: `Bearer ${state.key}` }
    };
    const body = {
        "commentBody": state.comment,
        "user": state.id,
        "post": postID
    };

    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }
    const handleSubmit = event => {
        event.preventDefault();
        if(state.key) {
            axios.post('https://strapi-blog-swgoh.herokuapp.com/comments',
            body,
            config
            )
            .then( res => console.log(res) )
            .catch( err => console.log(err) )
        }
        else {
            setState((prevState) => ({
                ...prevState,
                error:true
            }))
        }
    }
    return (
        <form className="container-fluid pb-2" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-10 ">
                    <div className="form-group">
                        <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Enter your comment"
                        name="comment"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-dark">Submit</button>
                </div>
            </div>
            {state.error ? <p className="text-danger">Please log in to leave a comment!</p> : ""}
        </form>
    )
}

export default CommentForm