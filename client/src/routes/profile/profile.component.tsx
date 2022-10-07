import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {currentUser && (
        <section className="h-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="rounded-top text-white d-flex flex-row">
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <img
                    src={currentUser.photo}
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: "150px", zIndex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    data-mdb-ripple-color="dark"
                    style={{ zIndex: 1 }}
                  >
                    Edit profile
                  </button>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <h5>{currentUser.name}</h5>
                  <p>{currentUser.email}</p>
                </div>
              </div>
              <div className="p-4 text-white">
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">4</p>
                    <p className="small text-muted mb-0">Photos</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">100</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">50</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
                <div className="container">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        style={{ color: "black" }}
                      >
                        Photos
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        aria-current="page"
                        href="#"
                        style={{ color: "white" }}
                      >
                        Liked
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#"
                        style={{ color: "white" }}
                      >
                        Saved
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body p-4 text-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Uploaded photos</p>
                  <p className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </p>
                </div>
                <div className="row g-2">
                  <div className="col mb-2">
                    <img
                      src="https://tinyurl.com/4wwv3dxy"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div>
                  <div className="col mb-2">
                    <img
                      src="https://tinyurl.com/3m7xcfyy"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col">
                    <img
                      src="https://tinyurl.com/4kaap6kv"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://tinyurl.com/452azerx"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
