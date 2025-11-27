import api from "./api";

const AUTH_URL = "/auth"; 


export const register = (registerData) => {
  console.log("Datos enviados al backend:", registerData);
  return api.post(`${AUTH_URL}/register`, registerData);
};


export const login = (loginData) => {
  return api.post(`${AUTH_URL}/login`, loginData);
};


export default {
  register,
  login,
};
