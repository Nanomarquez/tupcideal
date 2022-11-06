import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter } from "react-router-dom";
import "swiper/css/bundle";
import { AuthProvider } from "./context/authContext";
import axios from 'axios';
if(import.meta.env.MODE === 'development'){
  axios.defaults.baseURL = 'http://localhost:3001';
}
if(import.meta.env.MODE === 'production'){
  axios.defaults.baseURL = 'https://tupcideal-production-5005.up.railway.app/'
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
