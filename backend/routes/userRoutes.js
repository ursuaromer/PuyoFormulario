const { Router } = require('express');
const {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController
} = require('../controllers/userControllers');

const UserRouter = Router();

// Crear un nuevo usuario
UserRouter.post("/", async (req, res) => {
    const { userName, password, role } = req.body;
    try {
        const newUser = await createUserController({ userName, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los usuarios
UserRouter.get("/", async (req, res) => {
    try {
        const users = await getAllUsersController();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener usuario por ID
UserRouter.get("/:id", async (req, res) => { // Cambié la URL a "/:id" para mantener consistencia
    const { id } = req.params;
    try {
        const user = await getUserByIdController(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Actualizar usuario por ID
UserRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await updateUserByIdController(id, userData);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar usuario por ID
UserRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserByIdController(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = UserRouter;
