import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentUser,
  setFollowerList,
  setFollowingList,
} from "./store/user/user.action";
import { selectCurrentUser } from "./store/user/user.selector";
import { ChatData } from "./store/chat/chat.action";
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
import Profile from "./routes/profile/profile.component";
import MusicMakingView from "./routes/MusicMaker/MusicMakingView";
import Chat from "./routes/chat/chat.component";
import PlayListComp from "./routes/playlists/playlist.component";
import LandingPage from "./routes/landingpage/landingpage.component";

import {
  fetchUser,
  fetchBadges,
  createBadge,
  fetchFollowers,
  fetchFollowing,
  fetchEvents,
} from "./config/apiCalls";

import io, { Socket } from "socket.io-client";
const ENDPOINT = "http://localhost:3000"; // https://nufright.com for production
var socket: Socket;

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedChatCompare, setSelectedChatCompare] = useState<ChatData>();
  const profileBadge = require("../../assets/profile-badge.png").default;

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      if (!user) return;
      dispatch(setCurrentUser(user));
      const { ratings, badges } = await fetchBadges(user.id);
      dispatch(setRatingList(ratings));
      if (badges.length > 0) {
        dispatch(setBadgeList(badges));
      } else {
        const badge = await createBadge({
          userId: user.id,
          badgeName: "It's ALIIIIVEEEE!!",
          description: "Welcome to nuFright 😈",
          badge: "It's ALIIIIVEEEE!!",
        });
        dispatch(setBadgeList([badge]));
        badgeToast.fire({
          titleText: "It's ALIIIIVEEEE!!",
          text: "Welcome to nuFright 😈",
          imageUrl: profileBadge,
          imageAlt: "😈",
          imageHeight: "5rem",
          imageWidth: "5.6rem",
        });
      }
      const followers = await fetchFollowers(user.id);
      if(!followers) return;
      dispatch(setFollowerList(followers));
      const following = await fetchFollowing(user.id);
      if(!following) return;
      dispatch(setFollowingList(following));

      // const events = await fetchEvents();
      // dispatch(setEvents(events));
    };
    fetchData();
    // axios
    //   .get("/api/auth/login/successful")
    //   .then(({ data: { user } }) => {
    //     if (user) {
    //       dispatch(setCurrentUser(user));

    //       axios
    //         .get(`/api/user/${user.id}/ratings-badges`)
    //         .then(({ data: { badges, ratings } }) => {
    //           console.log("badges", badges, "\n\nratings", ratings);
    //           dispatch(setRatingList(ratings));

    //           if (badges.length) {
    //             dispatch(setBadgeList(badges));
    //           } else {
    //             const name = "It's ALIIIIVEEEE!!";
    //             const starterBadge = {
    //               id: `${user.id}=${name}`,
    //               name,
    //               description: "Welcome to nuFright 😈",
    //               badge: "dis wur da badge goes",
    //             };
    //             dispatch(setBadgeList([starterBadge]));
    //             axios
    //               .post("/api/badges", {
    // userId: user.id,
    // badgeName: starterBadge.name,
    // description: starterBadge.description,
    // badge: starterBadge.name,
    //               })
    //               .catch((err) =>
    //                 console.error("db couldn't store first badge", err)
    //               );
    //             badgeToast.fire({
    //               titleText: "It's ALIIIIVEEEE!!",
    //               text: "Welcome to nuFright 😈",
    //               imageUrl: profileBadge,
    //               imageAlt: "😈",
    //               imageHeight: "5rem",
    //               imageWidth: "5.6rem",
    //             });
    //           }
    //         })
    //         .catch((err) => {
    //           console.error(
    //             "error retrieving badges and ratings from backend \n",
    //             err
    //           );
    //         });

    //       //get following list
    //       axios
    //         .get(`/api/user/followings/${user.id}`)
    //         .then(({ data }) => {
    //           if (!data.length) return;

    //           dispatch(setFollowingList(data));
    //         })
    //         .catch((err) => {
    //           console.error("error retrieving followings from backend \n", err);
    //         });

    //       //gets followers list
    //       axios
    //         .get(`/api/user/followers/${user.id}`)
    //         .then(({ data }) => {
    //           if (!data.length) return;

    //           dispatch(setFollowerList(data));
    //         })
    //         .catch((err) => {
    //           console.error("error retrieving followers from backend \n", err);
    //         });
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/welcome" element={<LandingPage />} />
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route
        path="/*"
        element={
          <Navigation
            socket={socket}
            selectedChatCompare={selectedChatCompare}
          />
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="cinema" element={<Films />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:bookId" element={<Book />} />
        <Route path="costumes" element={<Costumes />} />
        <Route path="stories" element={<Stories />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="find-haunts" element={<MapBox />} />
        <Route path="sounds" element={<MusicMakingView />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="chats"
          element={
            <Chat
              socket={socket}
              socketConnected={socketConnected}
              selectedChatCompare={selectedChatCompare}
              setSelectedChatCompare={setSelectedChatCompare}
            />
          }
        />
        <Route path="playlist" element={<PlayListComp />} />
      </Route>
    </Routes>
  );
};

export default App;
