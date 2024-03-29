const checkErrorMistakeThrow = {
  isExist: function (item, message = '') {
    if (item) return
    throw new Error(`${message}`)
  },
  isSame: function (item1, item2, message = '') {
    if (item1 === item2) return
    throw new Error(`${message}`)
  }
}
module.exports = checkErrorMistakeThrow
