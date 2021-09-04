import http from "../http-ws";

const submitTemplate = data => {   
    return http.post("/template/temp/", data);
};
const getTemplates = () => {   
    return http.get("/template/");
};
const getByRef = ref => {   
    return http.get(`/template/ref/${ref}`)
};
const updateTemplate = data => {   
    return http.put(`/template/update/`, data)
};
  
  
  
export default {
    submitTemplate,
    getTemplates,
    getByRef,
    updateTemplate,
};