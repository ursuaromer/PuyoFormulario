const User = require('../models/User');
const bcrypt = require('bcrypt');

// Crear usuario
const createUserController = async ({ userName, password, role }) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({ userName, password: hashedPassword, role });
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los usuarios
const getAllUsersController = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener usuario por ID
const getUserByIdController = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar usuario por ID
const updateUserByIdController = async (id, userData) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        if (userData.password) {
            const saltRounds = 10;
            userData.password = await bcrypt.hash(userData.password, saltRounds);
        }
        await user.update(userData);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar usuario por ID
const deleteUserByIdController = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        await user.destroy();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController
};
