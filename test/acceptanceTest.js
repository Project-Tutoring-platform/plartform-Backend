const request = require('supertest')
const app = require('../app')
const assert = require('assert')
const userController = require('../controllers/user-controller')
const signController = require('../controllers/sign-controller')
const userService = require('../service/user-service')
const sinon = require('sinon')
const jwt = require('jsonwebtoken')
const { count } = require('console')

describe('驗收測試', function () {

  describe('註冊測試', (done) => {
    beforeEach(() => {
      sinon.stub(signController, 'postSignUp')
    })
    afterEach(() => {
      sinon.restore()
    })
    it('註冊成功', function () {
      sinon.stub(userService, 'postSignUp').resolves({
        status: 'success', data: {
          id: 1,
          email: 'user1@example.com',
        }
      })
      request(app)
        .post('/signup')
        .expect('Content-Type', /json/)
        .expect(200, { status: 'success' }, done)
    })
    it('註冊失敗', function (done) {
      sinon.stub(userService, 'postSignUp').rejects(new Error('mock signup test failure'))
      request(app)
        .post('/signup')
        .expect('Content-Type', /json/)
        .expect(res => {
          if (res.body.status === 'success') throw new Error('Expected status to be "error"')
        })
      done()
    })
  })
  describe('登入測試', () => {
    beforeEach(() => {
      sinon.stub(signController, 'postSignin')
    })
    afterEach(() => {
      sinon.restore()
    })
    it('登入成功', (done) => {
      const inputFormData = { email: 'user1@example.com', password: '12345678' }
      sinon.stub(userService, 'postSignin').resolves({
        data: {
          userData: {
            id: 1
          },
          token: 'adkjfoeiwajkeljfld'
        }
      })
      request(app)
        .post('/signin')
        .send(inputFormData)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (res.body.status === 'error') throw new Error('signin status to be "success"')
        })
        .expect(200, done)
    })
    it('登入失敗', (done) => {
      sinon.stub(userService, 'postSignin').rejects(new Error('mock signin test failure'))
      const inputFormData = { email: 'user1@example.com', password: '12345678' }

      request(app)
        .post('/signin')
        .send(inputFormData)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (res.body.status === 'success') throw new Error('signin status to be "error"')
        })
      done()
    })
  })
  describe('main page test', () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '7d' })
    beforeEach(() => {
      sinon.spy(userController, 'getUsers')
    })
    afterEach(() => {
      sinon.restore()
    })
    it('取得老師的資料', async () => {
      const expectedResponse = {
        count: 2,
        rows: [{
          email: 'user5@mail.com',
          isTeacher: true,
          introduce: '哈囉大家好',
          leaningHours: 0,
        }, {
          email: 'user6@mail.com',
          isTeacher: true,
          introduce: '大家好，我是小明',
          leaningHours: 50,
        }]
      }
      await sinon.stub(userService, 'getUsers').resolves(expectedResponse)
      const response = await request(app).get('/users').auth(token, { type: 'bearer' })
      console.log(response.body)
      assert.equal(response.body.data[0].isTeacher, true)

    })
    it('取得排行榜', async () => {
      const expectedResponse = {
        count: 2,
        rows: [{
          name: 'json',
          email: 'user5@mail.com',
          isTeacher: false,
          introduce: '哈囉大家好',
          leaningHours: 0,
        }, {
          email: 'user6@mail.com',
          isTeacher: false,
          introduce: '大家好，我是小明',
          leaningHours: 50,
        }]
      }
      await sinon.stub(userService, 'getUsers').resolves(expectedResponse)
      const response = await request(app)
        .get('/users?order=leaningHours&sequence=DESC')
        .auth(token, { type: 'bearer' })
      assert.equal(response.body.data[0].name, 'json')
    })
    it('搜尋測試，找到老師', async () => {
      const expectedResponse = {
        count: 1,
        rows: [{
          id: 1,
          name: 'json',
          email: 'user5@mail.com',
          isTeacher: false,
          introduce: '哈囉大家好',
          leaningHours: 0
        }]
      }

      sinon.stub(userService, 'getUsers').resolves(expectedResponse)
      const response = await request(app)
        .get('/users?searchKeyWord=user&isTeacher=1')
        .auth(token, { type: 'bearer' })
      sinon.assert.calledOnce(userService.getUsers)
      assert.match(response.body.data[0].name, /json/)
    })
  })
  describe('老師測試', (done) => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '7d' })
    beforeEach(() => {
      sinon.spy(userController, 'putIsTeacher')
    })
    afterEach(() => {
      sinon.restore()
    })
    it('申請老師資料通過', async () => {
      const expectedResponse = {
        id: 1,
        email: 'user1@mail.com',
        isTeacher: true,
        Teacher: {
          teachingStyle: '七八風格讓知識深入你的靈魂',
          introduced: '大家好，我是可以可愛老師，我會用愛來教導',
          link: 'http://domain.com',
          coursePeriod: '134'
        }
      }
      sinon.stub(userService, 'putIsTeacher').resolves(expectedResponse)
      const response = await request(app)
        .put('/users/isTeacher')
        .auth(token, { type: 'bearer' })

      assert.equal(response.body.data.Teacher.teachingStyle, '七八風格讓知識深入你的靈魂')

    })
  })
})
