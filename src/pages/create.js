import React, { useState, useEffect } from "react"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { navigate, graphql } from 'gatsby'

import Layout from '../layouts/layout'
import SEO from '../Components/seo'
import dummyImage from '../images/dummy-image.jpg'
import { slugify } from '../Components/slugify'

const Create = ({ data }) => {
    const [state, setState] = useState({
        title: '',
        content: '',
        image: '',
        imageID: '',
        category: '1',
        uploading: false,
        submit: false,
        key: undefined,
        userID:undefined,
        categories:[],
        username:undefined,
    })
    useEffect( () => {
         setState((prevState) => ({
            ...prevState,
            key: sessionStorage.getItem("user"),
            userID:sessionStorage.getItem("id"),
            username:sessionStorage.getItem("name"),
            categories:data.allStrapiCategory.nodes
        }))
       if(!sessionStorage.getItem("user")){
            navigate('/')
            alert("Please Log in to Create a Post.")
        }
    }, [])
    const config = {
            headers: { Authorization: `Bearer ${state.key}` }
        };

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
                            image: res.data[0].formats.small.url,
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
    
        const createPost = event => {
            event.preventDefault()
            setState((prevState) => ({
                ...prevState,
                submit: true
            }))
            const body = {
                "title": state.title,
                "content": state.content,
                "user": state.userID,
                "image": state.imageID,
                "category": state.category,
                "slug":slugify(state.title)
            };
    
            axios.post(`https://strapi-blog-swgoh.herokuapp.com/posts/`,
            body,
            config
            ).then( res => {
                setState((prevState) => ({
                    ...prevState,
                    submit: false
                }))
                console.log(res)
                navigate(`/author/${state.username}`, {
                    state: { 
                        createMsg:"The post has been created. Please allow a few seconds for the Site to reflect this, thank you! " 
                    }
                })
            })
            .catch( err => console.log(err))
        }

return(
    <Layout>
        <SEO pageTitle={`Create Post`} desc={`New post for ${state.username}`} />
        <div className="container shadow">
            <h2 className="display-4 pt-5">Create new Post</h2>
            <form onSubmit={createPost}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                className="form-control"
                                name="title"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Edit your content here in Markdown - <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">need help?</a></label>
                            <textarea
                                className="form-control textarea"
                                name="content"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <label>Markdown Preview</label>
                        <div className="form-group">
                            <ReactMarkdown className="preview" source={state.content} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="sticky-top">
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" name="category" onChange={handleChange} required>
                                    {state.categories.map(cat => {
                                        return <option key={cat.strapiId} value={cat.strapiId}>{cat.catTitle}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Upload a Cover Image</label>
                                <input
                                    className="form-control-file"
                                    type="file"
                                    name="file"
                                    onChange={updateImage}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                {
                                    state.uploading ?
                                        <div className="d-flex align-items-center">
                                            <strong>Uploading...</strong>
                                            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                                        </div> :
                                        <img className="img-fluid" src={state.image || dummyImage} alt="uploaded" />
                                }
                                <div className="text-center m-3">
                                    {state.image ? <button className="btn btn-danger" onClick={removeImage}>Choose another</button> : ""}
                                </div>

                            </div>
                            <div className="form-group row">
                                <div className="col-6"> </div>
                                <div className="col-6">
                                    {
                                       state.submit ? 
                                        <button className="btn btn-success m-3" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Creating...
                                </button>:
                                        <button className="btn btn-success m-3" disabled={state.uploading}>Create</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
)

}

export const query = graphql`
{
    allStrapiCategory {
        nodes {
          catTitle
          strapiId
        }
      }
}
`

export default Create