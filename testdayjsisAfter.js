const dayjs = require('dayjs')
const  isAfter = dayjs('2024-04-19 00:00').isAfter(dayjs('2024-04-20 11:30'))
console.log(isAfter)
