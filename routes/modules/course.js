const express = require('express')
const router = express.Router()
const courseController = require('../../controllers/course-controller')

router.put('/:courseId/reverse', courseController.reverseCourse)

module.exports = router
