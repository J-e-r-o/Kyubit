// src/services/authService.js
import api from "./api";

const AUTH_URL = "/auth"; 

// Registrar usuario
export const register = (registerData) => {
  console.log("Datos enviados al backend:", registerData);
  return api.post(`${AUTH_URL}/register`, registerData);
};

// Iniciar sesión
export const login = (loginData) => {
  return api.post(`${AUTH_URL}/login`, loginData);
};


export default {
  register,
  login,
};
