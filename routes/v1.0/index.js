const express = require('express')
const router = express.Router()
const user = require('./users')
const palette = require('./palette')
const note = require('./note')
const linebot = require('./linebot')

// endpoint: /v1.0/users/
router.use('/users/', user)

// endpoint: /v1.0/palette/
router.use('/palette/', palette)

// endpoint: /v1.0/note/
router.use('/note/', note)

// endpoint: /v1.0/linebot/
router.use('/linebot/', linebot)

module.exports = router
