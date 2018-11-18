import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "../shared/Admin/App";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("admin")
);
