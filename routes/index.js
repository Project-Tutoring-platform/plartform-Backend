const express = require('express')
const passport = require('../config/passport')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { authenticated } = require('../middleware/auth')

const { errorHandle } = require('../middleware/error-handler')

router.post('/signup', userController.postSignUp)
router.post('/signin', userController.postSignin)
router.get('/signin/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/oauth/boogle/callback', userController.passGoogleOauth)

router.get('/users', authenticated, userController.getUsers)
router.put('/users/isTeacher', authenticated, userController.putIsTeacher)

router.use('/', (req, res) => {
  res.status(404).json({ status: 'error', message: '404 Not Found' })
})
router.use('/', errorHandle)

module.exports = router
