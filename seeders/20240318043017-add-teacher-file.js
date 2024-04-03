'use strict'
const faker = require('faker')
const { User } = require('../models')

const Teachers = User.findAll({ where: { isTeacher: true }, raw: true })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await console.log(Teachers)
    await queryInterface.bulkInsert('Teachers',
      Array.from(await Teachers, (teacher) => ({
        teaching_style: faker.lorem.text(),
        course_link: faker.internet.url(),
        user_id: teacher.id,
        created_at: new Date(),
        updated_at: new Date()
      })))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teachers', {})
  }
}
