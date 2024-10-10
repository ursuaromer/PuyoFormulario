const { Router } = require('express')
const {createStudentController} = require('../controllers/studentControllers')

const studentRouter = Router()

//Create new student 
studentRouter.post("/", async(req, res)=>{
    const {id, firstName, lastName} = req.body
    try {
        const newStudent = await createStudentController({id, firstName, lastName})
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Get all students
//Update student by id
//Delete student by id

module.exports={
    studentRouter
}