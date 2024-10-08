const { Router } = require('express')

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