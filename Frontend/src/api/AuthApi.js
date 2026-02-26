import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth",
  withCredentials: true, // needed when backend uses credentials: true in CORS
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);