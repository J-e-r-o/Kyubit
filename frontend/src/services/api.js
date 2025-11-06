import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const token = JSON.parse(user).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("Petición exitosa:", response.status);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expirado o no válido. Cerrando sesión");
      localStorage.removeItem("user");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);


export default api;
