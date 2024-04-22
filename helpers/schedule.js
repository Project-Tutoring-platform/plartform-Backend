const cron = require('node-cron')
const { batchGetTeacherData, findNeedFinishCourse } = require('../service/schedule-service')

function setSchedule () {
  console.log('start schedule')
  cron.schedule('30 * * * *', () => {
    batchGetTeacherData()
  }, {
    scheduled: true,
    timezone: 'Asia/Taipei'
  })
  cron.schedule('0,30 18,19,20,21 * * *', () => {
    findNeedFinishCourse()
  }, {
    scheduled: true,
    timezone: 'Asia/Taipei'
  })
}

module.exports = setSchedule
