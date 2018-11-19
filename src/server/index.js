import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import React from "react";
import serialize from "serialize-javascript";
import { matchPath, StaticRouter } from "react-router-dom";
import compression from "compression";
import bodyParser from "body-parser";
import session from "express-session";

import UserApp from "../shared/User/App";
import AdminApp from "../shared/Admin/App";
import config from "./etc/config";
import userRoutes from "../shared/User/routes";
import adminRoutes from "../shared/Admin/routes";
import db from "./db/connect";
import sessionStore from "./sessionStore";
import { superuser, file, blog } from "./api";

const app = express();
db.setUpConnect();
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use(
  session({
    secret:
      "Hello,developer,thisIsssMySecret!No-no-no,please,dontRemoveMeAndDontEditMe!1100000100%001!Oooops!00011100GoodBeeeeee!",
    resave: false,
    key: "sid",
    saveUninitialized: false,
    store: sessionStore
  })
);

app.use("/api/superman", superuser);
app.use("/api/blog", blog);
app.use("/api/file", file);

app.use(express.static("public"));

app.get("/admin/*", (req, res, next) => {
  if (req.session.superman) {
    const activeRoute =
      adminRoutes.find(route => matchPath(req.url, route)) || {};

    const promise = activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData(req.path)
      : Promise.resolve();

    const title = activeRoute.title
      ? activeRoute.title
      : "Панель администратора";

    promise
      .then(data => {
        const context = { data };
        const markup = renderToString(
          <StaticRouter location={req.url} context={context}>
            <AdminApp />
          </StaticRouter>
        );

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>${title}</title>
          <script src="/adminbundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body>
          <div id="admin">${markup}</div>
        </body>
        </html>
        `);
      })
      .catch(next);
  } else {
    res.redirect("/admin");
  }
});

app.get("*", (req, res, next) => {
  const activeRoute = userRoutes.find(route => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  const title = activeRoute.title ? activeRoute.title : "Молодежное движение";

  promise
    .then(data => {
      const context = { data };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <UserApp />
        </StaticRouter>
      );

      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title}</title>
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
      </html>
      `);
    })
    .catch(next);
});

app.listen(config.PORT, () => {
  console.log(`Server is listening on port: ${config.PORT}`);
});
