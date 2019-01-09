import fetch from "isomorphic-fetch";
import axios from "axios";

import config from "../../server/etc/config";

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

//Event
export const getEvents = (page = 1, search = "all") => {
  let encodedURI = encodeURI(
    `${config.API_PREFIX}/api/event/get/${page}/${search}`
  );
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};
export const addEvent = data => {
  return axios.post(`${config.API_PREFIX}/api/event/add`, data);
};
export const editEvent = data => {
  return axios.post(`${config.API_PREFIX}/api/event/edit`, data);
};
export const getEventById = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/event/getbyid/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};
export const deleteEvent = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/event/delete/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};

//Blog
export const addBlog = data => {
  return axios.post(`${config.API_PREFIX}/api/blog/add`, data);
};
export const editBlog = data => {
  return axios.post(`${config.API_PREFIX}/api/blog/edit`, data);
};
export const getBlogs = (page = 1, search = "all") => {
  let encodedURI = encodeURI(
    `${config.API_PREFIX}/api/blog/get/${page}/${search}`
  );
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};
export const getBlogsById = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/blog/getbyid/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};
export const deleteBlog = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/blog/delete/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};

//Sport
export const addSport = data => {
  return axios.post(`${config.API_PREFIX}/api/sport/add`, data);
};
export const editSport = data => {
  return axios.post(`${config.API_PREFIX}/api/sport/edit`, data);
};
export const getSports = () => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/sport/get`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};
export const delSport = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/sport/delete/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};
export const getSportById = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/sport/getbyid/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};

//Field
export const addField = data => {
  return axios.post(`${config.API_PREFIX}/api/field/add`, data);
};

export const getFields = () => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/field/get`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};

export const delField = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/field/delete/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};

export const getFieldById = id => {
  let encodedURI = encodeURI(`${config.API_PREFIX}/api/field/getbyid/${id}`);
  return fetch(encodedURI)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.warn(err);
      return null;
    });
};

//Files
export const saveImage = data => {
  return axios.post(`${config.API_PREFIX}/api/file/add`, data);
};
export const saveArrayImage = data => {
  return axios.post(`${config.API_PREFIX}/api/file/addarray`, data);
};
