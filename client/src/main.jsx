import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
<<<<<<< HEAD
import  store  from "./redux/store";
=======
import store from "./redux/store";
>>>>>>> master
import { BrowserRouter } from "react-router-dom";
import "swiper/css/bundle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
