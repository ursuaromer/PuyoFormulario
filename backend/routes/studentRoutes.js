const { Router } = require('express')
const {createStudentController,
       getAllStudentsController,
       updateStudentByIdController

} = require('../controllers/studentControllers')

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
studentRouter.get("/", async(req, res)=>{
    try {
        const students =  await getAllStudentsController()
        res.status(200).json(students)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
//Update student by id
studentRouter.put("/:id", async(req, res)=>{
    const {id} = req.params
    const studentData = req.body
    try {
        const  updatedStudent = await updateStudentByIdController(id, studentData)
        if(!updatedStudent){
            return res.status(404).json({error: "Student not found"})
        }
        res.status(200).json(updatedStudent)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
//Delete student by id

module.exports={
    studentRouter
}