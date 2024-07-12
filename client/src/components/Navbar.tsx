import React from 'react';
import Logo from '../assets/img/logo.png';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <img src={Logo} alt="Logo" height={50} width={50} className="mr-2" />
        <a className="navbar-brand text-light">MANUSH Tech</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <a className="nav-link text-light font-weight-bold" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light font-weight-bold" href="/Login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
