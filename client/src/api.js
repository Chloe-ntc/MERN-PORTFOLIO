import axios from "axios";

// Change baseURL depending on environment
export const api = axios.create({
  baseURL:"http://localhost:5000",
  //baseURL: "https://mern-portfolio-4-yvv0.onrender.com", 
});
