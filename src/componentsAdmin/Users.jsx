import React, { useEffect, useState } from 'react';

import './css/Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: '',
    matricula: '',
    gmail: '',
    tipo: '',
    edad: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://34.231.151.154:3002/api/maestro');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://34.231.151.154:3002/api/maestro/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      // Actualizar la lista de usuarios después de la eliminación
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUserData({
      name: user.name,
      gmail: user.gmail,
      matricula: user.matricula,
      tipo: user.tipo,
      edad: user.edad,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://34.231.151.154:3002/api/maestro/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUserData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      // Actualizar la lista de usuarios después de la actualización
      await fetchUsers();
      resetEditForm(); // Reiniciar el formulario de edición
    } catch (error) {
      setError(error.message);
    }
  };

  const resetEditForm = () => {
    // Reiniciar el formulario y salir del modo de edición
    setEditUserId(null);
    setEditUserData({
      name: '',
      gmail: '',
      matricula: '',
      tipo: '',
      edad: '',
    });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin &gt; Maestro</h1>
        <p>Control de todos los usuarios</p>
      </header>
      <div className="admin-actions">
        <button className="btn-filter">Filter</button>
        <button className="btn-add-user">+ Add User</button>
        <button className="btn-import-users">Importar Usuarios</button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre del Alumno</th>
            <th>Matrícula</th>
            <th>Gmail</th>
            <th>Tipo</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="8">Error: {error}</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                {editUserId === user.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editUserData.name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="matricula"
                        value={editUserData.matricula}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="gmail"
                        name="gmail"
                        value={editUserData.gmail}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="tipo"
                        value={editUserData.tipo}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="edad"
                        value={editUserData.edad}
                        onChange={handleInputChange}
                      />
                    </td>

                    <td>
                      <button className="btn-action" onClick={() => handleUpdate(user.id)}>Guardar</button>
                      <button className="btn-action" onClick={resetEditForm}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.matricula}</td>
                    <td>{user.gmail}</td>
                    <td>{user.tipo}</td>
                    <td>{user.edad}</td>
                    <td>
                      <button className="btn-action" onClick={() => handleDelete(user.id)}>Eliminar</button>
                      <button className="btn-action" onClick={() => handleEdit(user)}>Editar</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
