const sequelize = require('../db')

//Importar modelos
const Student = require('./Student')
const Course = require('./Course')

const db ={
    sequelize,
    Student,
    Course,
    //Agregar más módelos aquí.
}

module.exports = db
