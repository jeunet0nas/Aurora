import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/router";
// import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "./redux/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StrictMode>
        <AppRouter />
        <ToastContainer position="top-right" />
      </StrictMode>
    </PersistGate>
  </Provider>
);
