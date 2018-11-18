import Home from "./Pages/Home";
import News from "./Pages/News";
import AddNews from "./Pages/Addnews";
// import Grid from "./Pages/Grid";

import { fetchPopularRepos } from "./api";

const routes = [
  {
    path: "/admin",
    exact: true,
    component: Home
  },
  {
    path: "/admin/news",
    component: News
  },
  {
    path: "/admin/addnews",
    component: AddNews
  }
  // {
  //   path: "/popular/:id",
  //   component: Grid,
  //   fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop())
  // }
];

export default routes;
