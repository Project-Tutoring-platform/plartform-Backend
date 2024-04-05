const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.get('', userController.getUsers)
router.put('/isTeacher', userController.putIsTeacher)

module.exports = router
