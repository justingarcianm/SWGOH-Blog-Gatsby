import React, { useState } from 'react'
import axios from 'axios'
import { navigate } from "gatsby"

import Layout from '../layouts/layout'
import SEO from '../Components/seo'

const Login = () => {
    const [state, setState] = useState({
        identifier: '',
        password: '',
        error: false,
        waiting: false
    })

    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async event => {
        event.preventDefault()
        setState((prevState) => ({
            ...prevState,
            waiting: true
        }))
        await axios.post('https://strapi-blog-swgoh.herokuapp.com/auth/local',
            {
                "identifier": state.identifier,
                "password": state.password
            })
            .then(res => {
                sessionStorage.setItem("user", res.data.jwt)
                sessionStorage.setItem("name", res.data.user.username)
                sessionStorage.setItem("id", res.data.user.id)
                navigate(`/author/${res.data.user.username}`)
            })
            .catch(() => {
                setState((prevState) => ({
                    ...prevState,
                    error: true,
                    waiting: false
                }))
            })

    }

    return (
        <Layout>
            <SEO pageTitle={`Login`} desc={`Login into the HoloBoard as a user`} />
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
                                    {state.waiting ? <button className="btn btn-dark" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging In...</button> :
                                        <button className="btn btn-dark">Submit</button>}
                                    <p className="pt-2">Don't have an account? Contact <a href="https://www.codingjustin.com/#contactForm" target="_blank" rel="noopener noreferrer">me</a> for a full demo for this site!</p>
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