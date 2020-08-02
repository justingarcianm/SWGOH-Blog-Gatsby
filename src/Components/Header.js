import React from 'react'
import { Link, activeClassName } from 'gatsby'
import { FaJediOrder,FaSearch } from 'react-icons/fa'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
  <Link className="navbar-brand" to="/">Holo <FaJediOrder></FaJediOrder> Board</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <form className="form-inline my-2 my-lg-0">
    <div className="row">
      <div className="col-10 col-md-10 pr-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      </div>
      <div className="col-2 col-md-2  pr-0 pl-1">
      <button className="btn px-1 text-light search" type="submit"><FaSearch></FaSearch></button>
      </div>
    </div>
    </form>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
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