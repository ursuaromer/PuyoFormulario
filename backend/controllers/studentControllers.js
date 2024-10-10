const Student = require('../models/Student')

const createStudentController =  async ({id, firstName, lastName}) => {
    try {
        const newStudent = await Student.create({id, firstName, lastName})
        return newStudent
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    createStudentController
}
