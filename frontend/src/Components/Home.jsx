import React from 'react'
import { Link } from 'react-router-dom';
import "../Style/Home.css"
import ToggleForm from './ToggleForm';

const Home = () => {
  return (
    <div className="navbar-container">
      <ToggleForm />
    {/* <nav className="navbar">
        <Link className="nav-link" to="/register">Register</Link>
        <Link className="nav-link" to="/login">Login</Link>
    </nav> */}
</div>

  )
}

export default Home