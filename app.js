require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const router = require('./routes')

app.use(bodyParser.json())

app.use(router)

app.listen(3000, () => {
  console.log('express server running on http://localhost:3000')
})

module.exports = app
