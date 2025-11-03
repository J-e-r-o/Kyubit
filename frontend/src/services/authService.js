import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

/**
 * Llama al endpoint de registro del backend.
 * @param {object} registerData - Un objeto JS con: name, lastname, email, password.
 * @returns {Promise} Una promesa con la respuesta de Axios (incluyendo el token).
 */
const register = (registerData) => {
    // axios.post(url, datos)
    // El 'registerData' se convertirá automáticamente en el DTO JSON
    // que tu AuthController espera en el @RequestBody.
    console.log("Datos que se envían al backend:", registerData);

    return axios.post(`${API_URL}/register`, registerData);
};

/**
 * Llama al endpoint de login del backend.
 * @param {object} loginData - Un objeto JS con: email, password.
 * @returns {Promise} Una promesa con la respuesta de Axios (incluyendo el token).
 */
const login = (loginData) => {
    // axios.post(url, datos)
    return axios.post(`${API_URL}/login`, loginData);
};

// Exportamos las funciones como un objeto para que nuestros
// componentes React (como RegisterPage.jsx) puedan importarlas y usarlas.
export default {
    register,
    login
};