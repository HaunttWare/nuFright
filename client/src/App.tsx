import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />} />
    <Route index element={<Home />} />
  </Routes>
);

export default App;
