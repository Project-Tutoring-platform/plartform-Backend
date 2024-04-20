const express = require('express')
const router = express.Router()

const passport = require('../config/passport')

const admin = require('./modules/admin')
const users = require('./modules/users')
const course = require('./modules/course')
const swagger = require('./modules/swagger')
const signController = require('../controllers/sign-controller')
const { authenticated, adminAuthenticated } = require('../middleware/auth')

router.use('/admin', authenticated, adminAuthenticated, admin)
router.use('/users', authenticated, users)
router.use('/course', authenticated, course)
router.use('/api-docs', swagger)

router.post('/signup', signController.postSignUp)
router.post('/signin', signController.postSignin)
router.get('/signin/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/oauth/boogle/callback', signController.passGoogleOauth)

router.use('/', (req, res, next) => {
  res.json({
    status: '404',
    message: 'can not find '
  })
  next()
})

const { errorHandle } = require('../middleware/error-handler')
router.use(errorHandle)

module.exports = router
