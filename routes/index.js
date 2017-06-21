const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

/**
 * bodyParser
**/

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', urlencodedParser, function (req, res, next) {
  // render index.html from VUE-SPA
  res.render('index')
})

router.post('/', jsonParser, (req, res, next) => {
  res.json({status: 'OK'})
})

module.exports = router
