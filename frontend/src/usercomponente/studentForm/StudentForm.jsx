import { useState } from "react";
import styles from "./StudentForm.module.css";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";

const StudentForm = () => {
  const navigate = useNavigate();
  const addUser = useUserStore((state) => state.addUser);
  const [studentData, setStudentData] = useState({
    userName: "",
    password: "",
    role: "student", // Valor por defecto
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del usuario:", studentData); // Verifica el contenido aquí
    try {
      await addUser(studentData); // Intento de agregar usuario
      setIsSuccessModalOpen(true);
      setStudentData({
        userName: "",
        password: "",
        role: "student", // Cambiado a "role" en lugar de "rol"
      });
    } catch (error) {
      alert("ERROR AL INSERTAR DATOS");
      console.error("Error al insertar usuario:", error.message);
    }
};


  const volverAinicio = () => {
    navigate("/");
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={volverAinicio}>
        Regresar
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h4 className={styles.title}>Insertar Usuario</h4>

        <label className={styles.label}>
          Nombre de Usuario:
          <input
            type="text"
            placeholder="Ingrese nombre de usuario"
            required
            name="userName"
            value={studentData.userName}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Contraseña:
          <input
            type="password"
            placeholder="Ingrese contraseña"
            required
            name="password"
            value={studentData.password}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Rol:
          <select
            name="role" // Cambia 'rol' a 'role'
            value={studentData.role}
            onChange={handleInputChange}
            className={styles.input}
            required
          >
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
            <option value="admin">Administrador</option>
          </select>
        </label>


        <button type="submit" className={styles.saveButton}>GUARDAR</button>
      </form>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        title="Éxito"
        message="El usuario se ha insertado con éxito."
      />
    </div>
  ); 
};

export default StudentForm;
