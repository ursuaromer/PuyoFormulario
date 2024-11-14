import React, { useState } from "react";
import styles from "./eliminarUsuario.module.css";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";  // Aquí corregimos la importación

const EliminarUsuario = () => {
  const [id, setId] = useState("");  // Cambié el estado para el ID en lugar de DNI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteUser } = useUserStore();  // Usamos el store correcto

  const volverAinicio = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setId(value);  // Cambié la lógica para actualizar solo el ID
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Abrir el modal de confirmación
  };

  const confirmarEliminacion = async () => {
    const deleted = await deleteUser(id); // Usamos el ID directamente en la eliminación

    if (deleted) {
      alert("Estudiante Eliminado");
      setId(""); // Limpiamos el campo ID
    } else {
      alert("No se encontró al estudiante o error al eliminar.");
    }

    setIsModalOpen(false); // Cerrar el modal después de la eliminación
  };

  const cancelarEliminacion = () => {
    setIsModalOpen(false); // Cerrar el modal sin eliminar
  };

  return (
    <div className={styles.container}>
      <button onClick={volverAinicio} className={styles.backButton}>
        Regresar
      </button>

      <form className={styles.form} onSubmit={handleDeleteClick}>
        <h2 className={styles.title}>ELIMINAR USUARIO</h2>
        <div className={styles.dataSection}>
          <h3 className={styles.subtitle}>Ingrese ID de la persona a eliminar:</h3> {/* Cambié DNI por ID */}
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="ID del Estudiante" // Cambié el placeholder a ID
            className={styles.input}
            name="id"
            value={id}  // Usamos el estado 'id' en lugar de 'Dni'
          />
          <button type="button" onClick={handleDeleteClick} className={styles.deleteButton}>
            Eliminar
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>¿Está seguro que desea eliminar al estudiante?</h3>
            <div className={styles.modalActions}>
              <button onClick={confirmarEliminacion} className={styles.confirmButton}>
                Confirmar
              </button>
              <button onClick={cancelarEliminacion} className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliminarUsuario;
