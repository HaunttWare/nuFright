import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Films from "./routes/movies-shows/films.component";
import Books from "./routes/books/books.components";
import Stories from "./routes/stories/stories.component";
import Gallery from "./routes/gallery/gallery.component";
import Authentication from "./routes/authentication/authentication.component";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="movies-shows" element={<Films />} />
      <Route path="books" element={<Books />} />
      <Route path="stories" element={<Stories />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="auth" element={<Authentication />} />
    </Route>
  </Routes>
);

export default App;
