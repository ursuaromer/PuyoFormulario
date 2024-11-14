import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
    users: [],
    currentUser: null, // Propiedad para almacenar el usuario encontrado

    addUser: async (user) => {
        try {
            const response = await axios.post("http://localhost:3001/user", user);
            set((state) => ({ users: [...state.users, response.data] }));
        } catch (error) {
            console.error("Error agregando usuario:", error.message);
            if (error.response) {
                console.log("Detalles del error:", error.response.data); // Inspecciona aquí
            }
        }
    },

    fetchUsers: async () => {
        try {
            const response = await axios.get("http://localhost:3001/user");
            set({ users: response.data });
        } catch (error) {
            console.error("Error al obtener usuarios:", error.message);
        }
    },

    deleteUser: async (id) => {
        try {
            console.log("Eliminando usuario con ID:", id);

            // Realiza la solicitud para eliminar el usuario en el servidor
            const response = await axios.delete(`http://localhost:3001/user/${id}`);

            // Actualiza el estado local eliminando al usuario por ID
            if (response) {
                set((state) => ({
                    users: state.users.filter((user) => user.id !== id),
                }));
            }
            return response;
        } catch (error) {
            console.error("Error al eliminar usuario:", error.message);
        }
    },

    updateUser: async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/user/${id}`, updatedData);
            set((state) => ({
                users: state.users.map((user) =>
                    user.id === id ? response.data : user
                ),
            }));
            return response;
        } catch (error) {
            console.error("Error al actualizar usuario:", error.message);
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/user/${id}`);
            set({ currentUser: response.data }); // Guardamos el usuario en el estado global
            return response.data;
        } catch (error) {
            console.error("Error al obtener el usuario:", error.message);
            console.error("Detalles del error:", error.response?.data); // Agrega más detalles
            return null;
        }
    },
}));

export default useUserStore;
