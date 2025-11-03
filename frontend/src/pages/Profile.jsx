import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error al cargar perfil:", err);
        alert("No se pudo cargar tu perfil. Es posible que tu sesión haya expirado.");
      });
  }, []);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil del usuario</h1>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Apellido:</strong> {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
