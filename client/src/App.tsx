import axios from "axios";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  setCurrentUser,
  setFollowerList,
  setFollowingList,
} from "./store/user/user.action";
import { setBadgeList } from "./store/badges/badges.action";
import { setRatingList } from "./store/ratings/ratings.action";
import { badgeToast } from "./components/alerts/badgeAlerts.component";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Films from "./routes/movies-shows/films.component";
import Books from "./routes/books/books.components";
import Book from "./components/book/book.component";
import Costumes from "./routes/costumes/costumes.component";
import Stories from "./routes/stories/stories.component";
import Gallery from "./routes/gallery/gallery.component";
import MapBox from "./routes/haunted-houses/Map.component";
import Authentication from "./routes/authentication/authentication.component";
import Profile from "./routes/profile/profile.component";
import MusicMakingView from "./routes/MusicMaker/MusicMakingView";
import Chat from "./routes/chat/chat.component";
import PlayListComp from "./routes/playlists/playlist.component";
const App = () => {
  const dispatch = useDispatch();
  const profileBadge = require("../../assets/profile-badge.png").default;

  useEffect(() => {
    axios
      .get("/api/auth/login/successful")
      .then(({ data: { user } }) => {
        if (user) {
          dispatch(setCurrentUser(user));

          axios
            .get(`/api/user/${user.id}/ratings-badges`)
            .then(({ data: { badges, ratings } }) => {
              console.log("badges", badges, "\n\nratings", ratings);
              dispatch(setRatingList(ratings));

              if (badges.length) {
                dispatch(setBadgeList(badges));
              } else {
                const name = "It's ALIIIIVEEEE!!";
                const starterBadge = {
                  id: `${user.id}=${name}`,
                  name,
                  description: "Welcome to nuFright 😈",
                  badge: "dis wur da badge goes",
                };
                dispatch(setBadgeList([starterBadge]));
                axios
                  .post("/api/badges", {
                    userId: user.id,
                    badgeName: starterBadge.name,
                    description: starterBadge.description,
                    badge: starterBadge.name,
                  })
                  .catch((err) =>
                    console.error("db couldn't store first badge", err)
                  );
                badgeToast.fire({
                  titleText: "It's ALIIIIVEEEE!!",
                  text: "Welcome to nuFright 😈",
                  imageUrl: profileBadge,
                  imageAlt: "😈",
                  imageHeight: "5rem",
                  imageWidth: "5.6rem",
                });
              }
            })
            .catch((err) => {
              console.error(
                "error retrieving badges and ratings from backend \n",
                err
              );
            });

          //get following list
          axios
            .get(`/api/user/followings/${user.id}`)
            .then(({ data }) => {
              if (!data.length) return;

              dispatch(setFollowingList(data));
            })
            .catch((err) => {
              console.error("error retrieving followings from backend \n", err);
            });

          //gets followers list
          axios
            .get(`/api/user/followers/${user.id}`)
            .then(({ data }) => {
              if (!data.length) return;

              dispatch(setFollowerList(data));
            })
            .catch((err) => {
              console.error("error retrieving followers from backend \n", err);
            });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="movies-shows" element={<Films />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:bookId" element={<Book />} />
        <Route path="costumes" element={<Costumes />} />
        <Route path="stories" element={<Stories />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="map" element={<MapBox />} />
        <Route path="music" element={<MusicMakingView />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chats" element={<Chat />} />
        <Route path="playlist" element={<PlayListComp />} />
      </Route>
    </Routes>
  );
};

export default App;
