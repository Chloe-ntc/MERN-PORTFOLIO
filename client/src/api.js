import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://mern-portfolio-4-yvv0.onrender.com",
});
