const express = require('express')
const router = express.Router()
const user = require('./users')
const palette = require('./palette')

// endpoint: /v1.0/users/
router.use('/users/', user)

// endpoint: /v1.0/palette/
router.use('/palette/', palette)

module.exports = router
