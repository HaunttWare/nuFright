import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

import PhotosTab from "../../components/profile-tabs/photos-tab/photos-tab.component";
import LikesTab from "../../components/profile-tabs/likes-tab/likes-tab.component";
import SavesTab from "../../components/profile-tabs/saves-tab/saves-tab.component";

export type ImageData = {
  id: string;
  image: string;
  caption: string;
};

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState("photos");
  const [userImages, setUserImages] = useState<ImageData[]>([]);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`/api/images/myImages/${currentUser.id}`)
        .then(({ data }) => {
          setUserImages(data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

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
                    alt="user-photo"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: "150px", zIndex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
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
                    <p className="mb-1 h5">{userImages.length}</p>
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
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "photos" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("photos")}
                    >
                      Photos
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "likes" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("likes")}
                    >
                      Likes
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "saves" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("saves")}
                    >
                      Saves
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className={`tab-pane fade ${
                      activeTab === "photos" ? "show active" : ""
                    }`}
                  >
                    <PhotosTab userImages={userImages} />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeTab === "likes" ? "show active" : ""
                    }`}
                  >
                    <LikesTab />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeTab === "saves" ? "show active" : ""
                    }`}
                  >
                    <SavesTab />
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
