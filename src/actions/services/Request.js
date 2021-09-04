import http from "../http-ws";

const get = () => {
  return http.get("/request/tasks/");
};

const getTasksByDocType = data => {
  return http.post(`/request/task/docType/`, data);
};

const getMyTasks = user => {
  return http.get(`/request/assignee/${user}`);
};
const getAGTasks = user => {
  return http.get(`/request/agTask/${user}`);
};
const getTasksRemarks = data => {
  return http.get(`/request/tasks/remarks/taskId/${data}`);
};
const getTasksByGroupUsers = grp => {
  return http.get(`/request/tasks/groupUsers/${grp}`);
};

const getHistory = () => {
  return http.get("/request/currentTasks/");
};
const getHistoryByOwner = owner => {
  return http.get(`/request/currentTasks/${owner}`);
};

const upload = data => {   
  return http.post("files/file", data);   
};

const completeFilAttachm = data => {   
  return http.post("files/fileCompleted/", data);   
};
const claimTask = data => {   
  return http.post("/request/claim/", data);   
};

const docValidAG = data => {   
  return http.post("/request/validAG/", data);
};
const docValidDG = data => {   
  return http.post("/request/validDG/", data);
};
const docNotValid = data => {   
  return http.post("/request/remark/", data);
};
const docNotValidDG = data => {   
  return http.post("/request/remarkDG/", data);
};
const docNotValidAG = data => {   
  return http.post("/request/remarkAG/", data);
};




export default {
  get,
  upload,
  claimTask,
  completeFilAttachm,
  docValidAG,
  docValidDG,
  docNotValid,
  docNotValidDG,
  docNotValidAG,
  getMyTasks,
  getAGTasks,
  getTasksByGroupUsers,
  getHistory,
  getHistoryByOwner,
  getTasksByDocType,
  // getTasksByDocTypeAndAssignee,
  getTasksRemarks,
};
