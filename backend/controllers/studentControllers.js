const Student = require('../models/Student')

// INSERTAR UN USUARIO 
const createStudentController = async ({ id, firstName, lastNameP,lastNameM,Dni,Age,Direccion,institucion }) => {
    try {
        const newStudent = await Student.create({ id, firstName, lastNameP,lastNameM,Dni,Age,Direccion,institucion })
        return newStudent
    } catch (error) {
        throw new Error(error.message)
    }
}

//OBTENER TODOS LOS DATOS DE LOS ESTUDIANTES 
const getAllStudentsController = async () => {
    try {
        const students = await Student.findAll()
        return students

    } catch (error) {
        throw new Error(error.message)
    }

}


// ESTE METODO ES SIMPLEMENTE PARA ACTUALIZAR LOS DATOS  DE UN ESTUDIANTE
const updateStudentByIdController = async (Dni, studentData) => {
    try {
        const student = await Student.findOne({where :{Dni}})
        if (!student) {
            return null
        }
        await student.update(studentData)
        return student
    } catch (error) {
        throw new Error(error.message)

    }

}
//ESTE METODO ES PARA ELIMINAR UN ESTUDIANTE A PARTIR DE SU DNI
const deleteStudentByIdController = async (Dni) => {
    try {
         // Busca el estudiante por DNI en lugar de por ID
         const student = await Student.findOne({ where: { Dni } });
        if (!student) {
            return null
        }
        await student.destroy()
        return student
    } catch (error) {
        throw new Error(error.message)

    }
}

// ESTE METODO ES PARA OBTENER UN SOLO ESTUDIANTE  POR SU DNI
const getStudentByDniController = async (Dni) => {
    try {
        // Busca al estudiante por DNI en la base de datos
        const student = await Student.findOne({ where: { Dni } });
        
        // Si no se encuentra el estudiante, retorna null
        if (!student) {
            return null;
        }

        // Retorna el estudiante encontrado
        return student;
    } catch (error) {
        throw new Error(error.message);
    }
};







module.exports = {
    createStudentController,
    getAllStudentsController,
    updateStudentByIdController,
    deleteStudentByIdController,
    getStudentByDniController
}
