'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [{
      email: 'root@example.com',
      password: '12345678',
      name: 'admin',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {})
  }
}
