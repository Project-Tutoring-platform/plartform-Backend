const passport = require('passport')
const passportJwt = require('passport-jwt')
const bcrypt = require('bcrypt')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const { User, Admin } = require('../models')

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOption, (jwtPayload, done) => {
  Promise.allSettled([
    User.findOne({ where: { email: jwtPayload.email }, attributes: { exclude: ['password'] }, raw: true }),
    Admin.findOne({ where: { email: jwtPayload.email }, attributes: { exclude: ['password'] }, raw: true })
  ]).then(results => {
    return results.find(result => result.value !== null).value
  })
    .then(user => done(null, user))
    .catch(err => done(err))
}))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile']
},
(req, accessToken, refreshToken, profile, done) => {
  const email = profile.email
  const name = profile.displayName
  return User.findOne({ where: { email }, attributes: { exclude: ['password'] } })
    .then(user => {
      if (user) return done(null, user)
      const randomPwd = Math.random().toString(36).slice(-8)
      return bcrypt.hash(randomPwd, 10)
        .then(hashPwd => User.create({ name, email, password: hashPwd }))
        .then(user => done(null, { id: user.id, name: user.name, email: user.email }))
    })
    .catch(err => done(err))
}
))

module.exports = passport
