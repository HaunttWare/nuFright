import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import App from "./App";

const el: HTMLElement | null = document.getElementById("root");
if (!el) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(el);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
