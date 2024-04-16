'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('Teachers', { week_select: '123' })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teachers', null)
  }
}
