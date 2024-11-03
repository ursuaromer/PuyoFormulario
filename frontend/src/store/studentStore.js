import { create } from "zustand"
import axios from "axios"

const useStudentStore = create((set) => ({
    students: [],
    currentStudent: null, // Nueva propiedad para almacenar el estudiante encontrado
    addStudent: async (student) => {
        try {
            const response = await axios.post("http://localhost:3001/Student", student);
            set((state) => ({ students: [...state.students, response.data] }));
        } catch (error) {
            console.log("ERROR AGREGANDO USUARIO", error.message);
        }
    },
    fetchStudents: async () => {
        try {
            const response = await axios.get("http://localhost:3001/Student");
            set({ students: response.data });
        } catch (error) {
            console.log("error al encontrar estudiantes ", error.message);
        }
    },
    deleteStudent: async (Dni) => {
        try {
            console.log("Eliminando estudiante con DNI:", Dni); // Para verificar el valor de dni

            // Realiza la solicitud para eliminar el estudiante en el servidor
            const response = await axios.delete(`http://localhost:3001/Student/${Dni}`);

            // Actualiza el estado local eliminando al estudiante por DNI
            if (response) {
                set((state) => ({
                    students: state.students.filter((student) => student.Dni !== Dni),
                }));
            }
            return response; // Opcional, devuelve la respuesta si necesitas manejarla en otro lugar
        } catch (error) {
            console.error("Error al eliminar estudiante:", error.message);
        }
    },

    updateStudent: async (Dni, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/Student/${Dni}`, updatedData);
            set((state) => ({
                students: state.students.map((student) =>
                    student.Dni === Dni ? response.data : student
                ),
            }));
            return response;
        } catch (error) {
            console.log("Error al actualizar estudiante:", error.message);
        }
    },
    getStudentByDni: async (dni) => {
        try {
            const response = await axios.get(`http://localhost:3001/Student/${dni}`);
            set({ currentStudent: response.data }); // Guardamos el estudiante en el estado global
            return response.data;
        } catch (error) {
            console.error("Error al obtener el estudiante:", error.message);
            return null;
        }
    },
}));

export default useStudentStore