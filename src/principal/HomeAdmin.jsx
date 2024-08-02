import { useState } from 'react';
import './css/App.css';
import Login from '../componentsAdmin/Login';
import Users from '../componentsAdmin/Users'; // Importa el componente Users

function HomeAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para el login

  return (
    <div id="root">
      {isLoggedIn ? (
        <Users /> // Muestra el componente Users si está logueado
      ) : (
        <Login onLogin={setIsLoggedIn} /> // Muestra el componente de login si no está logueado
      )}
    </div>
  );
}

export default HomeAdmin;
