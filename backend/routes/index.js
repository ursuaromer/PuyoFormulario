const {Router} = require('express')
const {studentRouter} = require('../routes/studentRoutes')
const UserRouter = require('../routes/userRoutes')

const router  = Router()

router.use('/student',studentRouter)
router.use('/user',UserRouter)
//router.use('/course', courseRoter)
//router.use('/teacher', teacherRouter)
//router.use('/exam', examRouter)


module.exports = router;
