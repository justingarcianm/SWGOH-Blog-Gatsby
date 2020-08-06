import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'

const EditProfile = ({ user }) => {
    const [ state, setState ] = useState({
        username:'',
        tagline:'',
        side:user.side,
        image:'',
        imageID:'',
        setImageID:'',
        uploading:false,
        removing:false,
        updating:false,
        key:undefined,
        id:user.strapiId
    })

    useEffect( () => {
        setState((prevState) => ({
           ...prevState,
           key: sessionStorage.getItem("user")
       }))
       getImageID()
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

    const getImageID = () => {
        axios.get('https://strapi-blog-swgoh.herokuapp.com/upload/files')
        .then( res => {
            let result = res.data.filter( image => image.related.length > 0 && image.related[0].username === user.username )[0].id
            setState((prevState) => ({
                ...prevState,
                setImageID:result
            }))
        })
        .catch( err => console.log(err))
    }

    const updateProfile = event => {
        event.preventDefault()
        setState((prevState) => ({
            ...prevState,
            updating: true
        }))
        const body = {
            "username": state.username || user.username,
            "tagline": state.tagline || user.tagline,
            "side": state.side || user.side,
            "userImage": state.imageID || state.setImageID
        };

        axios.put(`https://strapi-blog-swgoh.herokuapp.com/users/${state.id}`,
        body,
        config
        ).then( () => {
            if(state.image) {
                axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${state.setImageID}`, config )
                .then( () => {
                    alert("Your Profile has been updated. Please allow a few seconds for the site to reflect this.")
                    window.location.reload()

                })
                .catch( err => {
                    setState((prevState) => ({
                        ...prevState,
                        updating: false
                    }))
                    console.log(err)
                })  
            }
            alert("Your Profile has been updated. Please allow a few seconds for the site to reflect this.")
            window.location.reload()

        })
        .catch( err => {
            setState((prevState) => ({
                ...prevState,
                updating: false
            }))
            console.log(err)
        })
    }

    return (
        <div>
            <h3 className="mt-2">Edit Profile</h3>
            <hr/>
            <form onSubmit={updateProfile}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Edit username</label>
                            <input 
                            className="form-control"
                            type="text"
                            defaultValue={user.username}
                            name="username"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Edit Tagline</label>
                            <input 
                            className="form-control"
                            type="text"
                            defaultValue={user.tagline}
                            name="tagline"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Change Side</label>
                            <select className="form-control" name="side" onChange={handleChange}>
                            <option value="Light">Light</option>
                            <option value="Dark">Dark</option>
                        </select>
                        </div>
                        {state.updating ? <button className="btn btn-success m-3" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                 Updating...
                                </button> :
                                <button className="btn btn-success" disabled={state.uploading || state.removing}>UPDATE</button>
                                }
                    </div>
                    <div className="col-md-6">
                    <div className="form-group"> 
                    <label>Update Avatar</label>
                    <input type="file" className="form-control-file m-3" onChange={updateImage}/>
                    </div>
                        {state.image ? 
                        <div className="form-group text-center">
                        <img className="rounded-circle img-fluid author-image" alt="uploaded" src={state.image}/> 
                        <button className="btn btn-danger m-3" disabled={state.uploading || state.removing} onClick={removeImage} >Choose another</button>
                        </div>
                         : ""}
                         {state.uploading ? <div className="d-flex align-items-center">
                                            <strong>Uploading...</strong>
                                            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                                        </div> : ""}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile