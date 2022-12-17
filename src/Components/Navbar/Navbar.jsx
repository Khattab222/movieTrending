import React from "react";
import {Link, useNavigate} from 'react-router-dom'
export default function Navbar({userdata,logOut}) {
let navigate = useNavigate()



  return (
    <nav className="navbar navbar-expand-lg navbar-dark  shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to='home' >
          Noxe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          {userdata? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to='home'>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="people">
                People
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="network">
                TV
              </Link>
            </li>
          </ul>:null}
         




          <ul className="navbar-nav ms-auto d-flex align-items-center mb-2 mb-lg-0">
           
           

          {userdata? '':  <><li className="nav-item">
              <Link className="nav-link" to="register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Login
              </Link>
            </li></>}
            

            {userdata? <>
              <li className="nav-item">
            
              <a onClick={logOut} className="nav-link"  href=""> 
                Logout
              </a>
            </li>
            <span className="nav-link"> welcome {userdata.first_name}</span></>:'' }
           
          </ul>
        </div>
      </div>
    </nav>
  );
}
