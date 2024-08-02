import React, { useEffect, useState } from 'react';
import './css/UsersAlum.css';

function UsersAlum() {
  const [user, setUser] = useState(null); // State to hold a single user
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

  // Specify the ID of the user you want to display
  const userIdToDisplay = 2; // Replace with the actual ID you want to display

  useEffect(() => {
    fetchUserById(userIdToDisplay);
  }, [userIdToDisplay]);

  const fetchUserById = async (userId) => {
    try {
      console.log(`Fetching user with ID: ${userId}`);
      const response = await fetch(`http://34.231.151.154:3002/api/alumno/${userId}`);
      console.log('Response:', response);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Fetched user data:', data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError(error.message);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Alumno &gt; Users</h1>
        <p>STATUS del usuario</p>
      </header>
      <div className="users-table">
        {error ? (
          <div>Error: {error}</div>
        ) : user ? (
          <table>
            <thead>
              <tr>
                <th>Nombre del Alumno</th>
                <th>Matrícula</th>
                <th>Email</th>
                <th>Grado</th>
                <th>C1</th>
                <th>C2</th>
                <th>C3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                  </>
                )}
              </tr>
            </tbody>
          </table>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default UsersAlum;
