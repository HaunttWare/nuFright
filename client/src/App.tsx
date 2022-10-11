import axios from "axios";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "./store/user/user.action";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Films from "./routes/movies-shows/films.component";
import Books from "./routes/books/books.components";
import Book from "./components/book/book.component";
import Stories from "./routes/stories/stories.component";
import Gallery from "./routes/gallery/gallery.component";
import MapBox from "./routes/haunted-houses/Map.component";
import Authentication from "./routes/authentication/authentication.component";
import Profile from "./routes/profile/profile.component";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/auth/login/successful")
      .then(({ data: { user } }) => { 
        if(user) {
          dispatch(setCurrentUser(user));
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
        <Route path="stories" element={<Stories />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="map" element={<MapBox />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
