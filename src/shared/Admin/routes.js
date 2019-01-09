import Home from "./Pages/Home";
import News from "./Pages/News";
import AddNews from "./Pages/Addnews";
import Events from "./Pages/Events";
import Sport from "./Pages/Sport";
import AddSport from "./Pages/Addsport";
import AddEvent from "./Pages/Addevent";
// import Grid from "./Pages/Grid";

import {
  getBlogs,
  getBlogsById,
  getSports,
  getSportById,
  getEvents
} from "./api";

function getParams(path, noparams) {
  let params = path.split(noparams)[1];
  if (!params || params.lenght === 0) {
    return [];
  } else {
    return params.split("/");
  }
}

const routes = [
  {
    path: "/admin",
    exact: true,
    component: Home
  },
  {
    path: "/admin/news/:page?/:search?",
    component: News,
    fetchInitialData: path => getBlogs(...getParams(path, "/admin/news/"))
  },
  {
    path: "/admin/addnews",
    component: AddNews
  },
  {
    path: "/admin/editnews/:id",
    component: AddNews,
    fetchInitialData: path =>
      getBlogsById(...getParams(path, "/admin/editnews/"))
  },
  {
    path: "/admin/events/:page?/:search?",
    component: Events,
    fetchInitialData: path => getEvents(...getParams(path, "/admin/events/"))
  },
  {
    path: "/admin/addevent",
    component: AddEvent
  },
  {
    path: "/admin/sport",
    component: Sport,
    fetchInitialData: () => getSports()
  },
  {
    path: "/admin/addsport",
    component: AddSport
  },
  {
    path: "/admin/editsport/:id",
    component: AddSport,
    fetchInitialData: path =>
      getSportById(...getParams(path, "/admin/editsport/"))
  }
];

export default routes;
