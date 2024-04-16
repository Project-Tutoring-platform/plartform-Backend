const userService = require('../service/user-service')
const passport = require('../config/passport')
const jwt = require('jsonwebtoken')
const checkErrorMistakeThrow = require('../helpers/checkError')

const signController = {
  postSignUp: (req, res, next) => {
    return userService.postSignUp(req)
      .then(data => {
        res.status(200).json({ status: 'success', data })
      })
      .catch(err => next(err))
  },
  postSignin: (req, res, next) => {
    return userService.postSignin(req)
      .then(data => {
        res.status(200).json({
          status: 'success',
          data
        })
      }).catch(err => next(err))
  },
  passGoogleOauth: (req, res, next) => {
    try {
      passport.authenticate('google', (err, user) => {
        if (err) throw new Error(err.message)
        checkErrorMistakeThrow.isExist(user, 'Authenticated is failed')
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ status: 'success', token, user })
      })(req, res)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = signController
