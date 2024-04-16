const assert = require('assert')
const { User } = require('../models')
const SequelizeMock = require('sequelize-mock')
const userService = require('../service/user-service')
const sinon = require('sinon')
const checkErrorMistakeThrow = require('../helpers/checkError')
const bcrypt = require('bcrypt')


describe('單元測試', function () {

  describe('註冊測試', function () {
    afterEach(function () {
      sinon.restore()
    })
    // email必填
    it('email沒填', async function () {
      req = {
        body: {
          name: 'Rock',
          email: '',
          password: '',
          passwordCheck: '1234'
        }
      }
      const emailListen = sinon.spy(checkErrorMistakeThrow, 'isExist')
      const signUp = sinon.spy(userService, 'postSignUp')

      try {
        await userService.postSignUp(req)
      } catch (error) {

      }

      sinon.assert.calledOnce(emailListen)
      sinon.assert.calledWith(signUp, req)
    })
    // password= passwordCheck
    it('驗證密碼不相同', async function () {
      req = {
        body: {
          name: 'Rock',
          email: 'user@mail.com',
          password: '123457',
          passwordCheck: '1234'
        }
      }
      const listen = sinon.spy(checkErrorMistakeThrow, 'isSame')
      const signUp = sinon.spy(userService, 'postSignUp')

      try {
        await userService.postSignUp(req)
      } catch (error) {
      }

      sinon.assert.calledOnce(listen)
      sinon.assert.calledWith(signUp, req)
    })
    // email沒有重複
    it('email重複填寫', async function () {
      req = {
        body: {
          name: 'Rock',
          email: 'user1@mail.com',
          password: '12345678',
          passwordCheck: '12345678'
        }
      }
      const signUp = sinon.spy(userService, 'postSignUp')
      await sinon.stub(User, 'count').resolves(1)

      try {
        await userService.postSignUp(req)
        sinon.assert.calledWith(signUp, req)
        sinon.assert.threw(signUp)
      } catch (error) { }

    })
  })
  describe('登入測式', function () {
    afterEach(function () {
      sinon.restore()
    })
    it('email沒填', async function () {
      const signin = sinon.spy(userService, 'postSignin')
      const req = { body: { email: '', password: '1234' } }
      const emailListen = sinon.spy(checkErrorMistakeThrow, 'isExist')
      try {
        await userService.postSignin(req)
      } catch (error) { }
      sinon.assert.calledOnce(emailListen)
      sinon.assert.calledWith(signin, req)
      sinon.assert.threw(signin)

    })
    it('密碼沒填寫', async function () {
      const signin = sinon.spy(userService, 'postSignin')
      const req = { body: { email: 'user1@examle.com', password: '' } }
      const listen = sinon.spy(checkErrorMistakeThrow, 'isExist')
      try {
        await userService.postSignin(req)
        sinon.assert.calledOnce(listen)
        sinon.assert.calledWith(signin, req)
        sinon.assert.threw(signin)
      } catch (error) { }

    })
    it('密碼不正確', async function () {
      const req = { body: { email: 'user1@examle.com', password: '1234' } }
      const signin = sinon.spy(userService, 'postSignin')
      const hash = bcrypt.hashSync('12345', 10)
      const scryptListen = sinon.spy(bcrypt, 'compareSync').returned()
      sinon.stub(Promise, 'allSettled').resolves([
        { status: 'fulfilled', value: { id: 1, email: 'user1@example.com', password: hash } },
        { status: 'fulfilled', value: null }
      ])
      // sinon.stub(bcrypt,'compareSync').returns(false)

      try {
        await userService.postSignin(req)
      } catch (error) { }
      sinon.assert.calledWith(signin, req)
      sinon.assert.match(scryptListen, false)
    })
  })
})
