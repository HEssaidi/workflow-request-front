import axios from "axios";

const baseURL="http://localhost:8080/api";
export default axios.create({
  baseURL: baseURL ,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});