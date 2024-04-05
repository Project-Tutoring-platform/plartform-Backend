const express = require('express')
const router = express.Router()
const signController = require('../controllers/sign-controller')
const passport = require('../config/passport')
const { authenticated, adminAuthenticated } = require('../middleware/auth')

const { errorHandle } = require('../middleware/error-handler')
const admin = require('./modules/admin')
const users = require('./modules/users')

router.use('/admin', authenticated, adminAuthenticated, admin)
router.use('/users', authenticated, users)

router.post('/signup', signController.postSignUp)
router.post('/signin', signController.postSignin)
router.get('/signin/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/oauth/boogle/callback', signController.passGoogleOauth)

router.use('/', (req, res) => {
  res.status(404).json({ status: 'error', message: '404 Not Found' })
})
router.use(errorHandle)

module.exports = router
