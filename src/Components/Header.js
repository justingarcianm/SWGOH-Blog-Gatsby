import React from 'react'
import { Link } from 'gatsby'
import { FaJediOrder } from 'react-icons/fa'

import LoggedIn from './LoggedIn'
import Search from './Search'



const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
  <Link className="navbar-brand" to="/">Holo <FaJediOrder></FaJediOrder> Board</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
      <Search />
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/about">About</Link>
      </li>
      <LoggedIn />
    </ul>
  </div>
</nav>
    )
}

export default Header