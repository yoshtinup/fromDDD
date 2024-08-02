import { useState } from 'react';
import './css/App.css';
import LoginMaestro from '../componentsMaestro/LoginMaestro';
import UserMaestro from '../componentsMaestro/UserMaestro';

function HomeMaestro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para el login

  return (
    <div id="root">
      {isLoggedIn ? (
        <UserMaestro /> // Muestra el componente Users si está logueado
      ) : (
        <LoginMaestro onLogin={setIsLoggedIn} /> // Muestra el componente de login si no está logueado
      )}
    </div>
  );
}

export default HomeMaestro;
