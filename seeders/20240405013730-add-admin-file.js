'use strict'
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [{
      email: 'root@example.com',
      password: bcrypt.hashSync('12345678', 10),
      name: 'admin',
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null)
  }
}
