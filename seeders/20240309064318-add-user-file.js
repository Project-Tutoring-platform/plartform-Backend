'use strict'
const bcrypt = require('bcrypt')
const faker = require('faker')

const userData = [{
  name: 'user1',
  email: 'user1@example.com',
  password: bcrypt.hashSync('12345678', 10),
  introduce: faker.lorem.text(),
  avatar: `https://loremflickr.com/320/240/men,women/?random=${Math.random() * 100}`,
  is_teacher: 0,
  leaning_hours: 500,
  created_at: new Date(),
  updated_at: new Date()
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: bcrypt.hashSync('12345678', 10),
  introduce: faker.lorem.text(),
  avatar: `https://loremflickr.com/320/240/men,women/?random=${Math.random() * 100}`,
  is_teacher: 1,
  created_at: new Date(),
  updated_at: new Date()
}]
// eslint-disable-next-line array-callback-return
Array.from({ length: 50 }, () => {
  userData.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('1234', 10),
    introduce: faker.lorem.text(),
    leaning_hours: Math.round(Math.random() * 100),
    avatar: `https://loremflickr.com/320/240/men,women/?random=${Math.random() * 100}`,
    is_teacher: Math.round(Math.random()),
    created_at: new Date(),
    updated_at: new Date()
  })
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',
      userData
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}
