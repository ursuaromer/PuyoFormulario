const Student = require('../models/Student')

const createStudentController =  async ({id, firstName, lastName}) => {
    try {
        const newStudent = await Student.create({id, firstName, lastName})
        return newStudent
    } catch (error) {
        throw new Error(error.message)
    }
}

//get all students
const getAllStudentsController = async () => {
    try {
        const students =  await Student.findAll()
        return students

    } catch (error) {
        throw new Error(error.message)
    }

}


module.exports = {
    createStudentController,
    getAllStudentsController
}
