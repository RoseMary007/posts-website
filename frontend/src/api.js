import axios from "axios";

const API = axios.create({
  baseURL: "https://posts-website-xvkf.onrender.com",
});

export default API;