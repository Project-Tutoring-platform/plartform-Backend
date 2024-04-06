const userService = require('../service/user-service')

const userController = {
  getUsers: (req, res, next) => {
    return userService.getUsers(req)
      .then(data => res.status(200).json({
        status: 'success',
        count: data.count,
        data: data.rows
      }))
      .catch(err => next(err))
  },
  putIsTeacher: (req, res, next) => {
    return userService.putIsTeacher(req)
      .then(data => res.status(200).json({
        status: 'success',
        data
      }))
      .catch(err => next(err))
  }
}

module.exports = userController
