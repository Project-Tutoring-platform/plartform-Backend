const { User, Teacher } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkErrorMistakeThrow = require('../helpers/checkError')
const { Sequelize } = require('sequelize')
const condition = Sequelize.Op

// eslint-disable-next-line space-before-function-paren
function returnEmptyObjectOrWhereCondition(keyword, isTeacher) {
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
  const DataMaxAmount = User.count({ where: { isTeacher: true } })
  const dataNormalAmount = 10
  const indexFirstPosition = 0
  const { offset, limit, order, sequence, isTeacher, searchKeyWord } = request.query
  return User.findAndCountAll({
    attributes: { exclude: ['password'] },
    limit: limit ? Number(limit) < DataMaxAmount ? Number(limit) : DataMaxAmount : dataNormalAmount,
    offset: offset || indexFirstPosition,
    order: order ? [[order, sequence || 'ASC']] : [],
    where: returnEmptyObjectOrWhereCondition(searchKeyWord, isTeacher),
    include: isTeacher || searchKeyWord ? Teacher : [],
    nest: true,
    raw: true
  })
}

function jwtSignMessageObject (user) {
  let returnObject = {}
  if (user.isAdmin) {
    returnObject = { id: user.id, isAdmin: user.isAdmin }
    return returnObject
  } else {
    returnObject = { id: user.id }
    return returnObject
  }
}

const userService = {
  postSignUp: req => {
    const { name, email, password, passwordCheck } = req.body
    checkErrorMistakeThrow.isExist(email, 'account&password be wrong')
    checkErrorMistakeThrow.isExist(password, 'account&password be wrong')
    checkErrorMistakeThrow.isSame(password, passwordCheck, 'account&password be wrong')
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
    checkErrorMistakeThrow.isExist(email, 'email & password have to be')
    checkErrorMistakeThrow.isExist(password, 'email & password have to be')
    //  加入一個admin 兩個方式做promiseAll，或著做雙重確認，雙重確認np要抽象化程式
    return User.findOne({ where: { email } })
      .then(user => {
        const isSame = bcrypt.compareSync(password, user.password)
        if (user && isSame) {
          const userData = user.toJSON()
          delete userData.password
          const token = jwt.sign(jwtSignMessageObject(userData), process.env.JWT_SECRET, { expiresIn: '7d' })
          return { token, userData }
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
        checkErrorMistakeThrow.isExist(user, 'user to be exist')
        checkErrorMistakeThrow.isSame(user.isTeacher, false, 'Already is a teacher')
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
