import React, { Fragment } from 'react'
import { Link } from 'gatsby'

const LoggedIn = () => {
    const user = sessionStorage.getItem("name") || null
    if (user) {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" activeClassName="active" to={`/author/${user}`}>{user}</Link>
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