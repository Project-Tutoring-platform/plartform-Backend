const { User, Teacher, Admin } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkItems = require('../helpers/checkError')
const { Sequelize } = require('sequelize')
const condition = Sequelize.Op

// eslint-disable-next-line space-before-function-paren
function whereConditionOrReturnEmptyObject(keyword, isTeacher) {
  const whereCondition = {}
  if (keyword) {
    // eslint-disable-next-line no-const-assign
    whereCondition.name = { [condition.like]: `%${keyword}%` }
    whereCondition.isTeacher = true
  }
  if (isTeacher) {
    whereCondition.isTeacher = isTeacher
  }
  return whereCondition
}
// eslint-disable-next-line space-before-function-paren
async function withConditionUserFindAll(request) {
  if (!request) throw new Error(' request lost')
  const DataMaxAmount = await User.count()
  const dataNormalAmount = 10
  const indexFirstPosition = 0
  const { offset, limit, order, sequence, isTeacher, searchKeyWord } = request.query
  return User.findAndCountAll({
    attributes: { exclude: ['password'] },
    limit: limit ? Number(limit) < DataMaxAmount ? Number(limit) : DataMaxAmount : dataNormalAmount,
    offset: offset || indexFirstPosition,
    order: order ? [[order, sequence || 'ASC']] : [],
    where: whereConditionOrReturnEmptyObject(searchKeyWord, isTeacher),
    include: isTeacher || searchKeyWord ? Teacher : [],
    nest: true,
    raw: true
  })
}

function jwtSignMessageObject (user) {
  let returnObject = {}
  if (user.isAdmin) {
    returnObject = { id: user.id, email: user.email, isAdmin: user.isAdmin }
    return returnObject
  } else {
    returnObject = { id: user.id, email: user.email }
    return returnObject
  }
}

const userService = {
  postSignUp: req => {
    const { name, email, password, passwordCheck } = req.body
    checkItems.isExist(email, 'account&password be wrong')
    checkItems.isExist(password, 'account&password be wrong')
    checkItems.isSame(password, passwordCheck, 'account&password be wrong')
    return User.count({ where: { email } })
      .then(isMoreOne => {
        if (isMoreOne > 0) throw new Error('email have be exist')
        const hashPassword = bcrypt.hashSync(password, 10)
        return User.create({ name, email, password: hashPassword })
      })
      .then(data => {
        const userData = data.toJSON()
        delete userData.password
        return userData
      })
      .catch(err => { throw err })
  },
  postSignin: req => {
    const { email, password } = req.body
    checkItems.isExist(email, 'email & password have to be')
    checkItems.isExist(password, 'email & password have to be')
    return Promise.allSettled([
      User.findOne({ where: { email }, raw: true }),
      Admin.findOne({ where: { email }, raw: true })
    ]).then(results => {
      console.log(results)
      return results.find(result => result.value !== null).value
    }).then(user => {
      const isSame = bcrypt.compareSync(password, user.password)
      if (user && isSame) {
        delete user.password
        const token = jwt.sign(jwtSignMessageObject(user), process.env.JWT_SECRET, { expiresIn: '7d' })
        return { token, user }
      } else throw new Error('email or password filled in incorrectly ')
    })
      .catch(err => { throw err })
  },
  getUsers: req => {
    return withConditionUserFindAll(req)
      .then(data => data)
      .catch(err => { throw err })
  },
  putIsTeacher: async req => {
    const { teachingStyle, introduced, link, coursePeriod } = req.body
    return User.findByPk(req.user.id)
      .then(user => {
        checkItems.isExist(user, 'user to be exist')
        checkItems.isSame(user.isTeacher, false, 'Already is a teacher')
        user.update({ isTeacher: true, introduced })
        Teacher.create({ userId: user.id, teachingStyle, link, coursePeriod })
      }).then(() => {
        return User.findByPk(req.user.id, {
          attributes: { exclude: ['password'] },
          include: Teacher,
          nest: true,
          raw: true
        })
      }).then(data => data)
      .catch(err => { throw err })
  }
}
module.exports = userService
