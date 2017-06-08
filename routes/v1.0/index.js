const express = require('express')
const router = express.Router()
const user = require('./users')


// endpoint: /v1.0/users/
router.use('/users/', user)

module.exports = router

