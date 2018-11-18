import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "../shared/User/App";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
