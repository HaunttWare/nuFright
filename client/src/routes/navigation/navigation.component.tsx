import React from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => (
  <>
    <nav className="navbar navbar-dark navbar-expand-lg bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NuFright
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link className="nav-link" to="/movies-shows">
                Movies/Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stories">
                Stories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth">
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/map">
                Haunted Houses
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
  </>
);

export default Navigation;
