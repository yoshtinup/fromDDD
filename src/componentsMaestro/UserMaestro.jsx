import React, { useEffect, useState } from 'react';

import './css/UsersMaestro.css';

function UserMaestro() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    matricula: '',
    grado: '',
    c1: '',
    c2: '',
    c3: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://34.231.151.154:3002/api/alumno');
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
      const response = await fetch(`http://34.231.151.154:3002/api/alumno/${id}`, {
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
      email: user.email,
      matricula: user.matricula,
      grado: user.grado,
      c1: user.c1,
      c2: user.c2,
      c3: user.c3,
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
      const response = await fetch(`http://34.231.151.154:3002/api/alumno/${id}`, {
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
      email: '',
      matricula: '',
      grado: '',
      c1: '',
      c2: '',
      c3: '',
    });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Maestro &gt; Alumnos</h1>
        <p>Control de todos los Alumnos</p>
      </header>
      <div className="admin-actions">
        <button className="btn-filter">Filter</button>
        <button className="btn-add-user">Add User</button>
        <button className="btn-import-users">Importar Usuarios</button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre del Alumno</th>
            <th>Matrícula</th>
            <th>Email</th>
            <th>Grado</th>
            <th>C1</th>
            <th>C2</th>
            <th>C3</th>
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
                        type="email"
                        name="email"
                        value={editUserData.email}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="grado"
                        value={editUserData.grado}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="c1"
                        value={editUserData.c1}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="c2"
                        value={editUserData.c2}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="c3"
                        value={editUserData.c3}
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
                    <td>{user.email}</td>
                    <td>{user.grado}</td>
                    <td>{user.c1}</td>
                    <td>{user.c2}</td>
                    <td>{user.c3}</td>
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

export default UserMaestro;
