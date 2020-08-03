import React, { useState } from 'react'
import axios from 'axios'

const EditComment = ({ comment }) => {
    const [ state, setState ] = useState({
        comment:''
    })
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("user")}` }
    };
    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }
    const handleSubmit = async event => {
        event.preventDefault()
        await axios.put(`https://strapi-blog-swgoh.herokuapp.com/comments/${comment.id}`,
        { "commentBody": state.comment || comment.commentBody },config)
        .then( () => window.location.reload())
            .catch( err => console.log(err))
    }
    const deleteComment = async event => {
        event.preventDefault()
        await axios.delete(`https://strapi-blog-swgoh.herokuapp.com/comments/${comment.id}`,config)
        .then( () =>  window.location.reload())
        .catch( err => console.log(err))
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
                        defaultValue={comment.commentBody} 
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-info m-1">CONFIRM</button>
                    <button className="btn btn-danger m-1" onClick={deleteComment}>DELETE</button>
                </div>
            </div>
        </form>
    )
}

export default EditComment