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
      </div>
    </div>
  );
};

export default SavesTab;
