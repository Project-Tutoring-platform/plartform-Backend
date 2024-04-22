const { Course, User } = require('../models')
const courseService = {
  // 預約課程
  reverseCourse: async req => {
    const { courseId } = req.body
    const userId = req.query
    // 檢查是不是學生
    const user = await User.finByPk(userId, { where: { isTeacher: false } })
    if (!user) throw new Error('user is not exist')
    // 檢查有沒有這個課
    return Course.findByPk(courseId)
      .then(course => {
        return course.update({ isReserve: true, userId })
      })
      .catch(error => { throw error })
  }
}

module.exports = courseService
