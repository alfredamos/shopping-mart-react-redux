import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.route";
import {Provider} from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbootstrap/css/mdb.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { RouterProvider } from "react-router-dom";
import store from './store/index';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
