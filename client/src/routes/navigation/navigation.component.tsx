import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setCurrentUser } from "../../store/user/user.action";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(setCurrentUser(null));
    window.open("http://localhost:3000/api/auth/logout", "_self");
  };

  return (
    <>
      <nav 
      className="navbar navbar-dark navbar-expand-lg"
      style={{
        background: 'transparent'
      }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home" style={{fontFamily: 'Creepster, cursive'}}>
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
                <Link className="nav-link" to="/map">
                  Haunts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/music">
                  MusicMaker
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/playlist">
                  Playlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/costumes">
                  Costumes
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/chats">
                      Chat
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={currentUser.photo}
                        referrerPolicy="no-referrer"
                        alt="profile"
                        className="rounded-circle"
                        width="30"
                        height="30"
                      />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <span
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={logOutUser}
                        >
                          Log Out
                        </span>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/auth">
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
