const { Course, Teacher, CoursePeriod, Review } = require('../models')
const dayjs = require('dayjs')

// 撈全部老師資料
async function batchGetTeacherData () {
  Teacher.findAll({
    nest: true,
    include: [{ model: Course, include: CoursePeriod, where: { isReserve: false } }]
  }).then(teachers => {
    // 開始批次
    for (const teacher of teachers) {
      const teacherJson = teacher.toJSON()
      checkAddDeleteProcess(teacherJson).then(needUpdate => {
        if (needUpdate) {
          console.log(`處理老師ID: ${teacher.id}`)
        } else { console.log(` 老師ID :${teacher.id} 不需要更新`) }
      })
    }
  }).catch(error => { throw error })
}
// 檢查,新增,刪除程序
async function checkAddDeleteProcess (teacher) {
  // 原先資料庫的課程日期
  const originCourseDateList = originCourseDate(teacher)
  // 得到下兩週老師的想要的課程日期
  const expectedCourseDateList = expectedNextTwoWeekDateList(teacher)
  // 找出缺失的預期日期來增加或者使用預期資料
  const datesToAdd = originCourseDateList ? expectedCourseDateList.filter(date => !originCourseDateList.includes(date)) : expectedCourseDateList
  // 找出多餘的原先課程要刪除
  const datesToDelete = originCourseDateList.filter(date => {
    return !expectedCourseDateList.includes(date)
  })
  if (datesToAdd.length === 0 && datesToDelete.length === 0) return false
  // 新增缺少的日期
  const createPromise = datesToAdd.length ? creteCoursePromise(teacher, datesToAdd) : Promise.resolve('無資料新增')
  const deletePromise = datesToDelete.length ? deleteCoursePromise(datesToDelete) : Promise.resolve('無資料刪除')
  await Promise.all([createPromise, deletePromise])
  console.log(`id: ${teacher.id}老師課程資料更新成功`)
  return true
}
// 回傳根據課程時段的資料
function callCoursePeriodData (data) {
  const whichPeriod = data.coursePeriod ? (data.coursePeriod === '1') ? { isOneHour: true } : { isOneHour: false } : {}
  return CoursePeriod.findAll({ raw: true, where: whichPeriod })
}
// 回傳老師預期的日期
function expectedNextTwoWeekDateList (teacher) {
  const today = dayjs()
  const expectedWeekdayList = Array.from(teacher.weekSelect)
  const twoWeek = 14
  const expectedDateList = []
  for (let i = 1; i <= twoWeek; i++) {
    const date = today.add(i, 'day')
    const weekday = (date.day()).toString()
    if (expectedWeekdayList.includes(weekday)) {
      expectedDateList.push(date.format('YYYY-MM-DD'))
    }
  }
  return expectedDateList
}
// 回傳原先課程資料
function originCourseDate (teacher) {
  const dateList = teacher.Courses.map(obj => dayjs(obj.date).format('YYYY-MM-DD'))
  const uniqueDates = []
  dateList.forEach(date => {
    if (!uniqueDates.some(d => d === date)) {
      uniqueDates.push(date)
    }
  })
  return uniqueDates
}
// 根據參數 日期陣列和老師 來建立課程
async function creteCoursePromise (teacher, dateArray) {
  const periodData = await callCoursePeriodData(teacher)
  const createPromises = []
  dateArray.forEach(date => {
    periodData.forEach(period => {
      createPromises.push(Course.create({ teachId: teacher.id, week: dayjs(date).day(), date, periodId: period.id }))
    })
  })
  return createPromises
}
// 根據 日期陣列和條件 來刪除課程
function deleteCoursePromise (dateArray) {
  const deletePromise = dateArray.map(date => {
    return Course.destroy({ where: { date, isReserve: false } })
  })
  return Promise.all(deletePromise)
}

// about review
async function findNeedFinishCourse () {
  // 找出課程: 有預約, 沒有完成的
  const courses = await Course.findAll({ where: { isReserve: true, isFinish: false }, include: CoursePeriod, nest: true })
  if (!courses) return console.log("there aren't reserve course")
  for (const item of courses) {
    const course = item.toJSON()
    const { teachId, userId } = course
    const courseDateEndTime = `${course.date} ${course.CoursePeriod.endTime}` // 課程的日期和時間
    const isAfter = dayjs().isAfter(courseDateEndTime) // 確認是否過期了
    if (isAfter) {
      item.update({ isFinish: true })
        .then(() => console.log(`${course.id}Course have finished`))
        .catch(err => console.error(err))
      Review.create({ courseId: course.id, teacherId: teachId, userId })
        .then(date => console.log(date))
        .catch(err => console.error(err))
    }
  }
}
module.exports = { batchGetTeacherData, findNeedFinishCourse }
