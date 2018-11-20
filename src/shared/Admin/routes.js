import Home from "./Pages/Home";
import News from "./Pages/News";
import AddNews from "./Pages/Addnews";
import Events from "./Pages/Events";
// import Grid from "./Pages/Grid";

import { getBlogs, getBlogsById } from "./api";

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
    path: "/admin/events",
    component: Events
  }
  // {
  //   path: "/popular/:id",
  //   component: Grid,
  //   fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop())
  // }
];

export default routes;
