const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.get('', userController.getUsers)
router.put('/beTeacher', userController.putIsTeacher)

module.exports = router
