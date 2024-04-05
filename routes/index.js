const express = require('express')
const router = express.Router()
const signController = require('../controllers/sign-controller')
const passport = require('../config/passport')
const { authenticated, adminAuthenticated } = require('../middleware/auth')
const AppError = require('../helpers/appError')

const { errorHandle } = require('../middleware/error-handler')
const admin = require('./modules/admin')
const users = require('./modules/users')

router.use('/admin', authenticated, adminAuthenticated, admin)
router.use('/users', authenticated, users)

router.post('/signup', signController.postSignUp)
router.post('/signin', signController.postSignin)
router.get('/signin/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/oauth/boogle/callback', signController.passGoogleOauth)

router.all('*', (req, res, next) => {
  const appErr = new AppError(`Can't find ${req.originalUrl}`, 404)
  next(appErr)
})
router.use(errorHandle)

module.exports = router
