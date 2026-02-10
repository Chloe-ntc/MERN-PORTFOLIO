import axios from "axios";

// Change baseURL depending on environment
export const api = axios.create({
  baseURL: "https://mern-portfolio-3-h52l.onrender.com/",
});
