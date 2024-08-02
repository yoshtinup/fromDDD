import { useState } from 'react';
import './css/App.css';
import LoginAlum from '../componentsAlumno/LoginAlum';
import UsersAlum from '../componentsAlumno/UserAlum';
function HomeAlumno() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para el login

  return (
    <div id="root">
      {isLoggedIn ? (
        <UsersAlum /> // Muestra el componente Users si está logueado
      ) : (
        <LoginAlum onLogin={setIsLoggedIn} /> // Muestra el componente de login si no está logueado
      )}
    </div>
  );
}

export default HomeAlumno;
