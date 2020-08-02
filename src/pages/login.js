import React, { useState } from 'react'
import axios from 'axios'
import { navigate } from "gatsby"

import Layout from '../layouts/layout'

const Login = () => {
    const [ state,setState ] = useState({
        identifier:'',
        password:'',
        error:false
    })

const handleChange = event => {
    const { name, value } = event.target
    setState((prevState) => ({
        ...prevState,
        [name] : value
    }))
}

const handleSubmit = async event => {
    event.preventDefault()
    console.log(state)
    await axios.post('https://strapi-blog-swgoh.herokuapp.com/auth/local',
    {
        "identifier":state.identifier,
        "password": state.password
    })
    .then(res => {
        sessionStorage.setItem("user", res.data.jwt)
        sessionStorage.setItem("name", res.data.user.username)
        sessionStorage.setItem("id", res.data.user.id)
        navigate(`/author/${res.data.user.username}`)
    })
    .catch( () => {
        setState((prevState) => ({
            ...prevState,
            error:true
        }))
    })

}

    return (
        <Layout>
            <div id="login">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 offset-md-4 my-auto rounded shadow p-3 bg-light">
                        <h2 className="text-center">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                className="form-control" 
                                placeholder="username" 
                                type="text" 
                                name="identifier"
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className="form-group">
                            <input 
                            className="form-control" 
                            placeholder="password" 
                            type="password" 
                            name="password"
                            onChange={handleChange}
                            required
                            />
                            </div>
                            <div className="text-center">
                                {state.error ? <p className="text-danger">Incorrect Username or Password, please try again</p> : ""}
                            <button className="btn btn-dark">Submit</button>
                            </div>
                            
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login