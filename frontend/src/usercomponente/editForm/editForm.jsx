import { useState } from "react";
import useUserStore from "../../store/userStore.js"; 
import { useNavigate } from "react-router-dom";
import styles from "./editForm.module.css";
import Modal from "../modal/modal"; 

const EditForm = () => {
  const navigate = useNavigate();
  const { updateUser, getUserById } = useUserStore(); 

  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    password: "",
    role: ""
  });

  const [modalOpen, setModalOpen] = useState(false);

  const volverAInicio = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const idValue = userData.id;
    if (idValue && userData.userName && userData.password && userData.role) {
        const update = await updateUser(idValue, userData); 
        if (update) {
            setModalOpen(true);
        } else {
            alert("Hubo un error al actualizar el usuario");
        }
    } else {
        alert("Por favor complete todos los campos.");
    }
};

  const fetchUserData = async (id) => {
    try {
        const user = await getUserById(id); 
        if (user) {
            setUserData({
                id: user.id,
                userName: user.userName,
                password: user.password,
                role: user.role
            });
        } else {
            alert("Usuario no encontrado");
            setUserData({ id: "", userName: "", password: "", role: "" }); // Limpiar los campos si no se encuentra el usuario
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        alert("Hubo un error al obtener los datos del usuario");
    }
};

  // Manejar el evento de presionar Enter en el campo id
  const handleIdKeyPress = (e) => {
    if (e.key === "Enter") {
      if (userData.id) {
        fetchUserData(userData.id); // Buscar usuario solo cuando el id no esté vacío
      }
    }
  };

  // Vaciar los campos si el id se borra
  const handleIdChange = (e) => {
    const { value } = e.target;
    setUserData({
      id: value,
      userName: value ? userData.userName : "",
      password: value ? userData.password : "",
      role: value ? userData.role : "",
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={volverAInicio} className={styles.backButton}>
        Regresar
      </button>
      <form className={styles.form} onSubmit={handleSubmitUpdate}>
        <h4 className={styles.title}>Edición de Usuario</h4>

        <label className={styles.label}>
          Id Usuario
          <input
            type="text"
            placeholder="Enter id"
            name="id"
            value={userData.id}
            onChange={handleIdChange} // Actualizamos el id cuando cambia
            onKeyPress={handleIdKeyPress} // Ejecutamos la búsqueda cuando presionamos Enter
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Nombre de Usuario:
          <input
            type="text"
            placeholder="Enter Username"
            required
            name="userName"
            value={userData.userName}
            onChange={handleInputChange}
            className={styles.input}
            disabled={!userData.id} // Deshabilitar el campo si no hay un id
          />
        </label>

        <label className={styles.label}>
          Contraseña:
          <input
            type="password"
            placeholder="Enter Password"
            required
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className={styles.input}
            disabled={!userData.id} // Deshabilitar el campo si no hay un id
          />
        </label>

        <label className={styles.label}>
          Rol:
          <input
            type="text"
            placeholder="Enter Role"
            required
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            className={styles.input}
            disabled={!userData.id} // Deshabilitar el campo si no hay un id
          />
        </label>

        <button className={styles.submitButton}>Actualizar</button>
      </form>

      {/* Modal de éxito */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} 
        title="Éxito"
        message="Usuario actualizado con éxito."
      />
    </div>
  );
};

export default EditForm;
