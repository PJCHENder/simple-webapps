const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const Model = require('../../models')


// POST /v1.0/users/
router.post('/', (req, res, next) => {
  res.json({
    status: 'get POST'
  })
})


//  POST /v1.0/users/register
router.post('/register', jsonParser, function (req, res, next) {
  if (
    // 確認使用者有填寫每一個欄位
    req.body.email &&
    req.body.name &&
    req.body.password &&
    req.body.confirmPassword) {
    // 確認使用者填寫兩次的密碼是相同的
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error('Passwords do not match.')
      err.status = 400
      return next(err)
    }

    // 將使用者輸入的內容存成物件
    let userData = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }
    // 使用 schema 中的 Create Method 來將 document 寫入 mongo 中
    Model.User.create(userData, function (err, user) {
      // user 可以取得寫入 db 的資料
      if (err) {
        return next(err)
      } else {
        return res.json({stats: 'OK'})
      }
    })
  } else {
    // 若有漏填訊息的情況
    let err = new Error('All Fields Required!')
    err.status = 400   //  Bad Request
    return next(err)
  }
})



module.exports = router
