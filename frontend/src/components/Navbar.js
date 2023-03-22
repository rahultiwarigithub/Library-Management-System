import React, { useEffect, useContext } from 'react';
import { Link, redirect, useLocation } from 'react-router-dom';
import AuthContext from '../context/authContext';
import "./Navbar.css";


export default function Navbar() {
  
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    const authCtx = useContext(AuthContext);
    const {isAdmin, onLogout} = authCtx;

    const onLogoutClick = () => {
        onLogout();
        redirect('/');
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid ">
      <Link className="navbar-brand " style={{ fontSize: '40px' }}  to="/">Library Management System</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === "/" ? "active" : "" }`} aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === "/register" ? "active" : "" }`} to="/register">Register</Link>
                  </li>
                  {isAdmin && (
                      <li className="nav-item">
                          <Link className="nav-link" to="/" onClick={onLogoutClick}>Logout</Link>
                      </li>                    
                  )}
                  {!isAdmin && (
                      <li className="nav-item">
                          <Link className={`nav-link ${location.pathname === "/login" ? "active" : "" }`} to="/login">Login</Link>
                      </li>                    
                  )}
              </ul>		  
      </div>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <form className="form-inline">
            <input type="search" placeholder="TODO: non-functional"/><button type="submit">Search</button>
          </form>  
      </div>
      </div>
    </nav>
    );
}
