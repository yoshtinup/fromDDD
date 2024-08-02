import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Inicio.css";

function Home() {
  
  return (
    <div className="container">
      <h1 className="title">Seleccione su rol</h1>
      <div className="buttons">
        <Link to="/maestro">
          <button className="button">Maestro</button>
        </Link>
        <Link to="/alumno">
          <button className="button">Alumno</button>
        </Link>
        <Link to="/admin">
          <button className="button">Administrador</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;