const {Router} = require('express')
const {studentRouter} = require('../routes/studentRoutes')

const router  = Router()

router.use('/student',studentRouter)
//router.use('/course', courseRoter)
//router.use('/teacher', teacherRouter)
//router.use('/exam', examRouter)


module.exports = router;
