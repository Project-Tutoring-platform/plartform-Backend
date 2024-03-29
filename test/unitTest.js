const assert = require('assert')
const { User } = require('../models')
const request = require('supertest')
const SequelizeMock = require('sequelize-mock')
const userService = require('../service/user-service')
const sinon = require('sinon')
const checkErrorMistakeThrow = require('../helpers/checkError')


describe('單元測試', function () {

  describe('註冊測試', () => {
    
    
    afterEach(() => {
      sinon.restore()
    })
    // email必填
    it('email沒填', async () => {
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
    it('驗證密碼不相同', async () => {
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
    it('email重複填寫', () => {

    })
  })
  describe('登入測式', () => {
    // email密碼必填寫
    it('email沒填', () => {

    })
    // 密碼正確
    it('密碼不正確', () => {

    })
  })
})
