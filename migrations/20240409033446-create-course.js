'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      week: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      is_finish: {
        type: Sequelize.BOOLEAN
      },
      is_reserve: {
        type: Sequelize.BOOLEAN
      },
      period_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      teach_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses')
  }
}
