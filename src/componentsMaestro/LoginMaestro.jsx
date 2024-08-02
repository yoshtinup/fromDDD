import { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../assets/img/imagen.png';

const LoginMaestro = ({ onLogin }) => {
  const [gmail, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://34.231.151.154:3002/api/maestro');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const users = await response.json();
      const user = users.find((user) => user.gmail === gmail && user.matricula === matricula);

      if (user) {
        onLogin(true); // Inicio de sesión exitoso
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img src={Logo} className="logo" alt="Logo" />
        <label>Usuario: </label>
        <input
          type="gmail"
          value={gmail}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña: </label>
        <input
          type="password"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

LoginMaestro.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginMaestro;
