import React, { useState } from 'react'; // ¡Importamos useState!
import COVER_IMAGE from '../assets/prueba7.png'; // Asegúrate que la ruta sea correcta
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // ¡Importamos nuestro servicio!
import Modal from '../components/Modal'; // Importamos el Modal
import AddressForm from '../components/AddressForm'; // Importamos el Form de Dirección
import PaymentForm from '../components/PaymentForm'; // Importamos el Form de Pago
import { FiPlus, FiCheck } from 'react-icons/fi'; // Importamos iconos

const RegisterPage = () => {
  // --- LÓGICA DEL FORMULARIO (¡RE-AÑADIDA!) ---
  // Creamos "estados" para guardar los datos del formulario y los mensajes.
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '', // Lo usaremos solo en el front
    birthdate: '', // Asumiendo que quieres este campo
  });
  
  // --- Nuevo Estado para Modales y sus datos ---
  const [address, setAddress] = useState(null); // Para guardar la dirección del modal
  const [payment, setPayment] = useState(null); // Para guardar el pago del modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [error, setError] = useState(''); // Para mensajes de error
  const [loading, setLoading] = useState(false); // Para deshabilitar el botón
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // --- MANEJADORES ---

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para guardar datos del Modal de Dirección
  const handleSaveAddress = (data) => {
    setAddress(data); 
    setIsAddressModalOpen(false); 
  };


  const handleSavePayment = (data) => {
  
    setPayment(data); 
    setIsPaymentModalOpen(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(''); 

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!address) {
      setError('Por favor, agrega una dirección.');
      return;
    }
    if (!payment) {
      setError('Por favor, agrega un método de pago.');
      return;
    }
    
    setLoading(true); 
    
    try {
      const dataToSubmit = {
        // Datos del usuario
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        birthdate: formData.birthdate, 
        address: address, 
        payment: payment, 
      };


      const response = await authService.register(dataToSubmit);

      console.log('Respuesta del servidor:', response.data);
      alert('¡Registro exitoso! Serás redirigido al login.');
      navigate('/login'); 

    } catch (err) {
      console.error("Error en registro:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response) {
         setError('Error del servidor. Por favor, inténtelo de nuevo más tarde.');
      }
      else {
        setError('No se pudo conectar al servidor.');
      }
    } finally {
      setLoading(false); 
    }
  };

  // --- JSX (Renderizado) ---
  return (
    <> {/* Usamos un Fragment (<>) para permitir que los Modales estén al mismo nivel */}
      <div className="w-full h-screen flex flex-col lg:flex-row items-start bg-black">
        
        {/* --- COLUMNA IZQUIERDA (IMAGEN Y TEXTO) --- */}
        <div className="relative hidden lg:block lg:w-1/2 h-full flex-col">
          <div className="absolute top-[55%] flex flex-col z-10 pl-10 lg:pl-10"> 
            <h1 className="text-7xl xl:text-8xl 2xl:text-9xl text-[#E0E0E0] font-extrabold font-sans">
              Tu creación <br/> Tus reglas.
            </h1>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
          <img src={COVER_IMAGE} className="w-full h-full object-cover" />
        </div>

        
        {/* --- COLUMNA DERECHA (FORMULARIO) --- */}
        <div className="w-full lg:w-1/2 h-full bg-gradient-to-bl from-orange-500 to-black flex flex-col p-8 md:p-20 justify-center items-center space-y-6 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="w-full flex flex-col mb-5">
              <h3 className="text-3xl font-semibold mb-4 text-center text-[#FAF2EB]">Registro de Usuario</h3>
              <p className="text-sm text-center text-[#FAF2EB]">Ingrese sus datos por favor.</p>
            </div>

            {/* --- FORMULARIO CONECTADO --- */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Fila para Nombre y Apellido */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <input
                  type="text" 
                  name="name" 
                  placeholder="Nombre"
                  required
                  value={formData.name} 
                  onChange={handleChange} 
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
                />
                <input
                  type="text" 
                  name="lastname" o
                  placeholder="Apellidos"
                  required
                  value={formData.lastname}
                  onChange={handleChange} 
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
                />
              </div>
              
              {/* Campo Fecha de Nacimiento */}
              <div>
                <label htmlFor="date" className="text-sm text-[#FAF2EB] block mb-1">Fecha de nacimiento</label>
                <input
                  id="date"
                  type="date" 
                  name="birthdate" 
                  placeholder="Fecha de nacimiento"
                  value={formData.birthdate} 
                  onChange={handleChange} 
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
                />
              </div>

              {/* Campo Email */}
              <input
                type="email" 
                name="email" 
                placeholder="Email"
                autoComplete="email"
                required
                value={formData.email} 
                onChange={handleChange} 
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              />
              
              {/* Campo Contraseña */}
              <input
                type="password" 
                name="password" 
                placeholder="Nueva contraseña"
                autoComplete="new-password"
                required
                value={formData.password} 
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              />
              {/* Campo Confirmar Contraseña */}
              <input
                type="password" 
                name="confirmPassword" 
                placeholder="Confirma la contraseña"
                autoComplete="new-password"
                required
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              />

              {/* --- NUEVOS BOTONES DE MODAL --- */}
              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 pt-2">
                <button
                  type="button" 
                  onClick={() => setIsAddressModalOpen(true)}
                  className={`w-full flex justify-between items-center p-3 rounded-md border transition-colors ${
                    address
                      ? 'border-green-500 bg-green-50'
                      : 'border-[#301201] bg-[#301201] text-white hover:bg-[#241000]' 
                  }`}
                >
                  <span className={`${address ? 'text-green-700 font-medium' : 'text-white'}`}>
                    {address ? `Dirección: ${address.title}` : 'Agregar Dirección'}
                  </span>
                  {address ? <FiCheck className="text-green-500" /> : <FiPlus className="text-white" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className={`w-full flex justify-between items-center p-3 rounded-md border transition-colors ${
                    payment
                      ? 'border-green-500 bg-green-50' 
                      : 'border-[#301201] bg-[#301201] text-white hover:bg-[#241000]'
                  }`}
                >
                  <span className={`${payment ? 'text-green-700 font-medium' : 'text-white'}`}>
                    {payment ? 'Método de Pago Agregado' : 'Agregar Método de Pago'}
                  </span>
                  {payment ? <FiCheck className="text-green-500" /> : <FiPlus className="text-white" />}
                </button>
              </div>

              {error && <p className="text-sm text-red-300 text-center pt-2">{error}</p>}

              {/* Botón de Registro */}
              <button
                type="submit"
                disabled={loading} 
                className="w-full bg-[#FA8100] text-white font-bold p-3 rounded-md hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </form>
          </div>
          
          {/* Link para ir a Login */}
          <div className="w-full flex items-center justify-center mt-4">
            <p className="text-sm font-normal text-[#E8E1D8]">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-semibold underline underline-offset-2 cursor-pointer text-[#E8E1D8]">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* --- MODALES (Fuera del div principal para el z-index) --- */}
      <Modal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        title="Agregar Nueva Dirección"
      >
        <AddressForm onSave={handleSaveAddress} />
      </Modal>

      <Modal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        title="Agregar Método de Pago"
      >
       
        <PaymentForm onSave={handleSavePayment} onClose={() => setIsPaymentModalOpen(false)} />
      </Modal>
    </>
  );
};

export default RegisterPage;

