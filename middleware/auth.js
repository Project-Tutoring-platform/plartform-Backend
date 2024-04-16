const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })
const adminAuthenticated = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else throw new Error('Unauthorized')
}
module.exports = {
  authenticated,
  adminAuthenticated
}
