import http from "../http-ws";


const create = data => {   
  return http.post("/request/", data);   
};
const get = () => {   
  return http.post("/request/user");   
};
const getUserByEmail = email => {   
  return http.get(`/request/user/${email}`);   
};
const getGroupsByUserEmail = email => {  
  return http.get(`/request/userGroups/${email}`);   
};



export default {
  create,
  get,
  getUserByEmail,
  getGroupsByUserEmail,
};
