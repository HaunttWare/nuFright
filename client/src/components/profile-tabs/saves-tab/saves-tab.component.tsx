import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import MovieTabContent from "../../profile-tabs-content/saved-tab/movie-tab-content/movie-tab-content.component";
import ShowTabContent from "../../profile-tabs-content/saved-tab/show-tab-content/show-tab-content.compoenent";

const SavesTab = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState("movies");
  const [userSavedMovies, setUserSavedMovies] = useState([]);
  const [userSavedShows, setUserSavedShows] = useState([]);
  const [userSavedBooks, setUserSavedBooks] = useState([]);

  useEffect(() => {
    // if currentUser is not null, then fetch the data
    if (currentUser) {
      axios
        .get(`/api/user/${currentUser.id}/saved-movies`)
        .then((res) => setUserSavedMovies(res.data));

      axios
        .get(`/api/user/${currentUser.id}/saved-shows`)
        .then((res) => setUserSavedShows(res.data));
    }
  }, [currentUser]);

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <div className="btn-group mt-5">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setActiveTab("movies")}
          >
            Movies
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setActiveTab("shows")}
          >
            Shows
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setActiveTab("books")}
          >
            Books
          </button>
        </div>
      </div>
      {/* tab content */}
      <div className="mt-5">
        {activeTab === "movies" && (
          <MovieTabContent userSavedMovies={userSavedMovies} />
        )}
        {activeTab === "shows" && (
          <ShowTabContent userSavedShows={userSavedShows} />
        )}
        {activeTab === "books" && (
          <div className="d-flex flex-wrap">
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src="https://images.unsplash.com/photo-1542733384-8b3b0f3b5f9d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Book 1</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavesTab;
