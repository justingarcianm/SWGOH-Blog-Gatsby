import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { navigate } from 'gatsby'


const EditPost = ({ post, categories }) => {
    const [state, setState] = useState({
        title: '',
        content: '',
        image: '',
        imageID: '',
        category: '',
        setImageID:'',
        uploading: false,
        submit: false,
        delete: false,
        key: undefined,
        userID:undefined
    })
    useEffect( () => {
         setState((prevState) => ({
            ...prevState,
            key: sessionStorage.getItem("user"),
            userID:sessionStorage.getItem("id")
        }))
        getImageID()
        const deleteMsg = "The post has been deleted, please give the site a few seconds to reflect this. Thank you!";
        const updateMsg = "The post has been updated. Please allow a few seconds for the site to reflect this."
    }, [])
    const config = {
        headers: { Authorization: `Bearer ${state.key}` }
    };

    const getImageID = () => {
        axios.get('https://strapi-blog-swgoh.herokuapp.com/upload/files')
        .then( res => {
            let result = res.data.filter( image => image.related.length > 0 && image.related[0].slug === post.slug )[0].id
            setState((prevState) => ({
                ...prevState,
                setImageID:result
            }))
        })
        .catch( err => console.log(err))
    }

    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const updateImage = event => {
        if (event.target) {
            setState((prevState) => ({
                ...prevState,
                uploading: true
            }
            ))
            const data = new FormData()
            data.append('files', event.target.files[0])

            axios.post("https://strapi-blog-swgoh.herokuapp.com/upload",
                data,
                config
            )
                .then(res => {
                    setState((prevState) => ({
                        ...prevState,
                        image: res.data[0].url,
                        uploading: false,
                        imageID: res.data[0].id
                    }))
                })
                .catch(err => console.log(err))
        }
    }

    const removeImage = event => {
        event.preventDefault()
        if (state.image) {
            axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${state.imageID}`,
                config
            )
                .then(res => {
                    console.log(res)
                    setState((prevState) => ({
                        ...prevState,
                        image: '',
                        imageID: ''
                    }))
                })
                .catch(err => console.log(err))
        }
    }

    const updatePost = event => {
        event.preventDefault()
        setState((prevState) => ({
            ...prevState,
            submit: true
        }))
        const body = {
            "title": state.title || post.title,
            "content": state.content || post.content,
            "user": state.userID,
            "image": state.imageID || state.setImageID,
            "category": state.category || post.category.id
        };

        axios.put(`https://strapi-blog-swgoh.herokuapp.com/posts/${post.strapiId}`,
        body,
        config
        ).then( () => {
            if(state.image) {
                axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${state.setImageID}`, config )
                .then( () => {
                    setState((prevState) => ({
                        ...prevState,
                        submit: false
                    }))
                    navigate(`/post/${post.slug}`, {
                        state: { updateMsg }
                    })
                })
                .catch( err => console.log(err))  
            }
            setState((prevState) => ({
                ...prevState,
                submit: false
            }))
            navigate(`/post/${post.slug}`, {
                state: { updateMsg }
            })
        })
        .catch( err => console.log(err))
    }

    const deletePost = event => {
        event.preventDefault()
        let response = prompt("Enter the word 'delete' to confirm")

        if(response === "delete") {
            axios.delete(`https://strapi-blog-swgoh.herokuapp.com/posts/${post.strapiId}`,
            config)
            .then( () => {
                axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${state.setImageID}`, config )
                navigate(`/author/${post.user.username}`, {
                    state:{ deleteMsg }
                })
            })
            .catch( err => console.log(err)) 
        }
    }

    return (
        <div className="container shadow">
            <h2 className="display-4 pt-5">Currently Editing: "{post.title}"</h2>
            <form onSubmit={updatePost}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                className="form-control"
                                name="title"
                                defaultValue={post.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Edit your content here in Markdown - <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">need help?</a></label>
                            <textarea
                                className="form-control textarea"
                                defaultValue={post.content}
                                name="content"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <label>Markdown Preview</label>
                        <div className="form-group">
                            <ReactMarkdown className="preview" source={state.content || post.content} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="sticky-top">
                            <div className="form-group">
                                <label>Category | Currently: "{post.category.catTitle}"</label>
                                <select className="form-control" name="category" onChange={handleChange}>
                                    {categories.map(cat => {
                                        return <option key={cat.strapiId} value={cat.strapiId}>{cat.catTitle}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Upload a new Cover Image</label>
                                <input
                                    className="form-control-file"
                                    type="file"
                                    name="file"
                                    onChange={updateImage}
                                />
                            </div>
                            <div className="form-group">
                                <label>Cover Image</label>
                                {
                                    state.uploading ?
                                        <div className="d-flex align-items-center">
                                            <strong>Uploading...</strong>
                                            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                                        </div> :
                                        <img className="img-fluid" src={state.image || post.image.publicURL} alt="uploaded" />
                                }
                                <div className="text-center m-3">
                                    {state.image ? <button className="btn btn-danger" onClick={removeImage}>Choose another</button> : ""}
                                </div>

                            </div>
                            <div className="form-group row">
                                <div className="col-6">
                                    {
                                        state.delete ?
                                            <button className="btn btn-danger m-3" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Deleting...
                                        </button> :
                                            <button className="btn btn-danger m-3" onClick={deletePost}>DELETE</button>
                                            }
                                </div>
                                <div className="col-6">
                                    {
                                       state.submit ? 
                                        <button className="btn btn-success m-3" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Updating...
                                </button>:
                                        <button className="btn btn-success m-3">UPDATE</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPost