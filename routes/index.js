const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')
const path = require('path')

const passport = require('../config/passport')

const admin = require('./modules/admin')
const users = require('./modules/users')
const signController = require('../controllers/sign-controller')
const { authenticated, adminAuthenticated } = require('../middleware/auth')

router.use('/admin', authenticated, adminAuthenticated, admin)
router.use('/users', authenticated, users)

const file = fs.readFileSync(path.join('swagger', 'swagger.yaml'), { encoding: 'utf-8' })
const swaggerDocument = YAML.parse(file)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
