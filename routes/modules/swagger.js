const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')
const path = require('path')

const file = fs.readFileSync(path.join('swagger', 'swagger.yaml'), { encoding: 'utf-8' })
const swaggerDocument = YAML.parse(file)
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = router
