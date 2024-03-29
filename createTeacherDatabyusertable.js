const { User, Teacher } = require('./models')

async function testhook() {
  return User.update({
    isTeacher: false

  }, { where: { email: 'user3@example.com' } })
}
// user.addHook('afterCreate', async (user, option) => {

// })

testhook()
