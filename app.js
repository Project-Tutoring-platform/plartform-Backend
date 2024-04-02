if (process.env.NODE_ENV === 'production') {
  require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

const router = require('./routes')

app.use(bodyParser.json())

app.use(router)

app.listen(port, () => {
  console.log('express server running on http://platform-backend-dev.ap-northeast-1.elasticbeanstalk.com')
})

module.exports = app
