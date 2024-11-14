import React, { useEffect } from 'react';
import useUserStore from '../../store/userStore';  // Importamos el store de usuarios
import styles from './studentList.module.css';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const navigate = useNavigate();
  const { fetchUsers, users, deleteUser } = useUserStore();  // Accedemos a los métodos y estados

  const volverAinicio = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchUsers();  // Fetch de usuarios al cargar el componente
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id);  // Eliminamos al usuario por ID
    }
  };

  return (
    <div className={styles.fondo_genereral}>
      <div className={styles.listContainer}>
      <button onClick={volverAinicio} className={styles.backButton}>Volver a inicio</button>
        <h1 className={styles.title}>Lista de Usuarios</h1>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>  {/* Mostrar el username */}
                <td>{user.userName}</td>  {/* Mostrar el username */}
                <td>{user.password}</td>  {/* Mostrar la password */}
                <td>{user.role}</td>  {/* Mostrar el role */}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
