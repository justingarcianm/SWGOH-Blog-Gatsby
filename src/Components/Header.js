import React from 'react'
import { Link, activeClassName } from 'gatsby'
import { FaJediOrder } from 'react-icons/fa'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
  <Link className="navbar-brand" to="/">Holo <FaJediOrder></FaJediOrder> Board</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/about">About</Link>
      </li>
    </ul>
  </div>
</nav>
    )
}

export default Header