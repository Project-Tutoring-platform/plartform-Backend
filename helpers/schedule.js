const cron = require('node-cron')
const { batchGetTeacherData } = require('../service/course-service')

function setSchedule () {
  console.log('start schedule')
  cron.schedule('30 * * * *', () => {
    batchGetTeacherData()
  }, {
    scheduled: true,
    timezone: 'Asia/Taipei'
  })
}

module.exports = setSchedule
