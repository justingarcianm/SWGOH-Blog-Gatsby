import React, { useState, useEffect } from "react"
import Layout from '../layouts/layout'
import { navigate } from 'gatsby'

const Create = () => {
    const [ user, setUser ] = useState(undefined)
    useEffect( () => {
        setUser(sessionStorage.getItem('user'))
        
    },[])
// TODO - Get this to work!!!
    const loginCheck = () => {
        if(!user) {
            navigate('/');
            alert("Please login to create a new Post");
        }
    }
return(
    <Layout>
        <h2>Create Post</h2>
    </Layout>
)
    
}

export default Create