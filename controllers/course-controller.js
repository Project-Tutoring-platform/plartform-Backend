const { courseService } = require('../service/course-service')

const courseController = {
  reverseCourse: (req, res, next) => {
    return courseService.reverseCourse(req)
      .then(data => res.status(200).json({
        status: 'success',
        data
      }))
      .catch(err => next(err))
  }
}

module.exports = courseController
