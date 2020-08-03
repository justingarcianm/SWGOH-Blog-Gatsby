import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'gatsby'

const LoggedIn = () => {
    const [ key, setKey ] = useState(undefined)
    useEffect(() => {
       setKey(sessionStorage.getItem("name")) 
    }, [])
    
    if (key) {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" activeClassName="active" to={`/author/${key}`}>{key}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={() => sessionStorage.clear()}>Logout</Link>
                </li>
            </Fragment>
        )
    }
    else {
        return (
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        )
    }
}

export default LoggedIn