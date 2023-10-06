import axios from "axios";

axios.defaults.withCredentials = true;

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // Get API url from .env file
});

export default api;
