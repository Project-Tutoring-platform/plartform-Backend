const AppError = require('../helpers/appError')
const checkPassOrMistakeThrow = {
  isExist: function (item, message = '') {
    if (item) return
    throw new AppError(`${message}`)
  },
  isSame: function (item1, item2, message = '') {
    if (item1 === item2) return
    throw new AppError(`${message}`)
  }
}
module.exports = checkPassOrMistakeThrow
