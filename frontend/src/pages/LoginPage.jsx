import React, { useState } from 'react'; // <-- FALTABA ESTA IMPORTACIÓN
import COVER_IMAGE from '../assets/prueba5.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- FALTABA ESTA IMPORTACIÓN
import authService from '../services/authService'; // <-- FALTABA ESTA IMPORTACIÓN

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Ahora 'useAuth' está importado
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Usamos el authService que ya creamos (más limpio que fetch)
      const response = await authService.login({ email, password });

      if (response.data) {
        const userData = response.data; // userData es tu AuthResponse
        console.log('Usuario autenticado:', userData);

        // Llamamos a la función 'login' del contexto global
        // Esto guardará al usuario en el estado y en localStorage
        login(userData);

        // Redirigir a la página principal
        navigate('/'); // Redirige a la HomePage (que está en "/")
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Usuario o contraseña incorrectos o error de conexión.');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      {/* Imagen de portada */}
      <div className="relative hidden md:block md:w-1/2 md:h-full flex-col">
        <div className="absolute top-[10%] left-[5%] flex flex-col z-10">
          <h1 className="text-7xl lg:text-9xl text-[#E0E0E0] font-extrabold ml-10 lg:ml-20 font-sans">
            Creá <br /> Pedí <br /> Disfrutá.
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
        <img src={COVER_IMAGE} className="w-full h-full object-cover" />
      </div>

      {/* Formulario de login */}
      <div className="w-full md:w-1/2 h-full bg-gradient-to-bl from-orange-500 to-black flex flex-col p-10 md:p-20 justify-center items-center space-y-6 md:space-y-8">
        <h1 className="text-[#FAF2EB] text-2xl font-semibold">PizzUM & BurgUM</h1>

        <div className="w-full max-w-md">
          <div className="w-full flex flex-col mb-5">
            <h3 className="text-3xl font-semibold mb-4 text-center text-[#FAF2EB]">Iniciar Sesión</h3>
            <p className="text-sm text-center text-[#FAF2EB]">Ingrese sus datos por favor.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              required
            />

            {/* Muestra el error si existe */}
            {error && <p className="text-sm text-red-300 text-center">{error}</p>}

            <div className="w-full flex flex-col sm:flex-row items-center justify-between text-sm">
              <div className="flex items-center mb-2 sm:mb-0">
                <input type="checkbox" id="remember" className="w-4 h-4 mr-2 cursor-pointer" />
                <label htmlFor="remember" className="select-none cursor-pointer text-[#E8E1D8]">
                  Recordar usuario
                </label>
              </div>
              <p className="font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 text-[#E8E1D8]">
                Olvidé mi Contraseña
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FA8100] text-white font-bold p-3 rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              Ingresar
            </button>
          </form>
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <p className="text-sm font-normal text-[#E8E1D8]">
            ¿No tiene cuenta aún?{' '}
            <Link to="/register" className="font-semibold underline underline-offset-2 cursor-pointer text-[#E8E1D8]">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

