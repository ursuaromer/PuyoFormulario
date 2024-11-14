const sequelize = require('../db')

//Importar modelos
const Student = require('./Student')
const Course = require('./Course')
const User = require('./User')

const db ={
    sequelize,
    Student,
    Course,
    User
    //Agregar más módelos aquí.
}

module.exports = db
