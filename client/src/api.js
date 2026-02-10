import axios from "axios";

// Change baseURL depending on environment
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});
