const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastNameP: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastNameM: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Age: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institucion: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

//TEAHER

module.exports = Student