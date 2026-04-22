import axios from "axios";

const API = axios.create({
  baseURL: "https://posts-website-xvkf.onrender.com/api",
});

export default API;