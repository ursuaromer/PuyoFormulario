const { Router } = require('express')
const {createStudentController,
       getAllStudentsController,
       updateStudentByIdController,
       deleteStudentByIdController,
       getStudentByDniController

} = require('../controllers/studentControllers')

const studentRouter = Router()

//INSERTAR UN ESTUDIANTE 
studentRouter.post("/", async(req, res)=>{
    const {id, firstName, lastNameP,lastNameM,Dni,Age,Direccion,institucion } = req.body
    try {
        const newStudent = await createStudentController({id, firstName, lastNameP,lastNameM,Dni,Age,Direccion,institucion })
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//ESTE ES EL METODO PARA OBTENER TODOS LOS ESTUDIANTES 
studentRouter.get("/", async(req, res)=>{
    try {
        const students =  await getAllStudentsController()
        res.status(200).json(students)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//ESTE ES LA RUTA  PARA ACTUALIZAR UN ESTUDIANTE

studentRouter.put("/:Dni", async(req, res)=>{
    const {Dni} = req.params
    const studentData = req.body
    try {
        const  updatedStudent = await updateStudentByIdController(Dni, studentData)
        if(!updatedStudent){
            return res.status(404).json({error: "Student not update"})
        }
        res.status(200).json(updatedStudent)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
//ESTE ES LA RUTA PARA ELIMINAR UN ESTUDIANTE
studentRouter.delete("/:Dni",async(req,res)=>{
    const {Dni}=req.params
    try {
        const deleteStudent=await  deleteStudentByIdController(Dni)
        if(!deleteStudent){
            return res.status(404).json({error: "Estudiante no eliminado"})
        }
        res.status(200).json(deleteStudent)

    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
})


//ESTE ES UNA RUTA PARA OBTENER UN ESTUDIANTE POR SU DNI 
studentRouter.get("/:Dni", async (req, res) => {
    const { Dni } = req.params;

    try {
        const student = await getStudentByDniController(Dni);

        if (!student) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





module.exports={
    studentRouter
}