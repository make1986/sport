// import fetch from "isomorphic-fetch";
import axios from "axios";

import config from "../../server/etc/config";

// export const fetchPopularRepos = (language = "all") => {
//   const encodedURI = encodeURI(
//     `https://api.github.com/search/repositories?q=stars:>1+language:${language}$sort=stars&order=desc&type=Repositories`
//   );
//
//   return fetch(encodedURI)
//     .then(data => data.json())
//     .then(repos => repos.items)
//     .catch(err => {
//       console.warn(err);
//       return null;
//     });
// };

// SuperUser
export const checkAdmin = data => {
  return axios.post(`${config.API_PREFIX}/api/superman/checkadmin`, data);
};
export const addSuperuser = () => {
  return axios.post(`${config.API_PREFIX}/api/superman/add`, {});
};
export const checkAuth = () => {
  return axios.get(`${config.API_PREFIX}/api/superman/checkauth`);
};
export const logoutAdmin = () => {
  return axios.get(`${config.API_PREFIX}/api/superman/logout`);
};

//Blog
export const addBlog = data => {
  return axios.post(`${config.API_PREFIX}/api/blog/add`, data);
};

//Files
export const saveImage = data => {
  return axios.post(`${config.API_PREFIX}/api/file/add`, data);
};
export const saveArrayImage = data => {
  return axios.post(`${config.API_PREFIX}/api/file/addarray`, data);
};
