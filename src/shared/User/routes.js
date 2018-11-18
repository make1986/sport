import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
// import Grid from "./Pages/Grid";

import { fetchPopularRepos } from "./api";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    title: "Валентина Паевская"
  },
  {
    path: "/admin",
    exact: true,
    component: Admin,
    title: "Вход в панель администратора"
  }
  // {
  //   path: "/popular/:id",
  //   component: Grid,
  //   fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop())
  // }
];

export default routes;
