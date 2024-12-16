import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/router";
// import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
    <ToastContainer position="top-right" />
  </StrictMode>
);
