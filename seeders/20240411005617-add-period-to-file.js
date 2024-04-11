'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const periodArrayForOneHour = []
    for (let i = 18; i < 21; i++) {
      periodArrayForOneHour.push({
        start_time: `${i}:00`,
        end_time: `${i + 1}:00`,
        is_one_hour: true,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    for (let i = 18; i < 21; i++) {
      periodArrayForOneHour.push({
        start_time: `${i}:00`,
        end_time: `${i}:30`,
        is_one_hour: false,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    for (let i = 18; i < 21; i++) {
      periodArrayForOneHour.push({
        start_time: `${i}:30`,
        end_time: `${i + 1}:00`,
        is_one_hour: false,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('CoursePeriods', periodArrayForOneHour)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('coursePeriod', null)
  }
}
