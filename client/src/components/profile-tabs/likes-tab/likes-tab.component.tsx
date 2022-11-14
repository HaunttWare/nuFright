import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";

import MovieTabContent from "../../profile-tabs-content/liked-tab/movie-tab-content/movie-tab-content.component";
import ShowTabContent from "../../profile-tabs-content/liked-tab/show-tab-content/show-tab-content.compoenent";

const LikesTab = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState("movies");
  const [userLikedMovies, setUserLikedMovies] = useState([]);
  const [userLikedShows, setUserLikedShows] = useState([]);

  useEffect(() => {
    // if currentUser is not null, then fetch the data
    if (currentUser) {
      axios
        .get(`/api/user/${currentUser.id}/liked-movies`)
        .then((res) => setUserLikedMovies(res.data));

      axios
        .get(`/api/user/${currentUser.id}/liked-shows`)
        .then((res) => setUserLikedShows(res.data));
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
          <MovieTabContent userLikedMovies={userLikedMovies} />
        )}
        {activeTab === "shows" && (
          <ShowTabContent userLikedShows={userLikedShows} />
        )}
      </div>
    </div>
  );
};

export default LikesTab;
