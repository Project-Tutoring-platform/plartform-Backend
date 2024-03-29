'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Teachers', 'course_period', Sequelize.STRING)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Teachers', 'course_period')
  }
}
