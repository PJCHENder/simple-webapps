const express = require('express')
const router = express.Router({mergeParams: true})
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const Model = require('../../models')
const request = require('superagent')
const facebook = require('../../config/facebook')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt')

// POST /v1.0/users/login
router.post('/login', jsonParser, (req, res, next) => {
  /**
   * 不使用 APP Access Token 的方式
   */
  let url = 'https://graph.facebook.com/v2.9/debug_token'
  request.get(url)
  .query({input_token: req.body.input_token})
  .query({access_token: `${facebook.appId}|${facebook.appSecrete}`})
  .end((error, response) => {
    if (error) {
      next(error)
    }

    let facebookResponse = JSON.parse(response.text)

    if (facebookResponse.data.is_valid) {
      // 1. 如果登入成功，儲存會使用到的欄位
      let email = req.body.email
      let facebookId = req.body.facebookId
      let name = req.body.name

      // 2. 檢查使用者是否已在 db 中
      Model.User.findOne({email: email}, (err, user) => {
        if (err) {
          next(err)
        }
        if (user) {
          // 如果使用者存在（曾經登入過)
          let token = giveMeToken(user)
          res.status(200).json({
            status: 200,
            message: 'Login Successful: User has been created',
            token
          })
        } else {
          // 如果使用者不存在（沒有登入過），則建立使用者
          let newUser = new Model.User()
          newUser.email = email
          newUser.name = name
          newUser.facebookId = facebookId
          let token = giveMeToken(newUser)
          newUser.save(function (err, user) {
            if (err) {
              return next(err)
            }
            res.status(200).json({
              status: 200,
              message: 'Login Successful: Create New User',
              token,
              info: user
            })
          })
        }
      })
    } else {
      res.status(200).json({
        status: 400,
        message: 'Facebook Login Failed',
        facebookResponse
      })
    }
  })
})

function giveMeToken (user) {
  let payload = {
    aud: user.facebookId,
    sub: user.email,
    exp: ~~((new Date((new Date()).getTime() + 1000 * 60 * 60 * 24)).getTime() / 1000),
    nbf: ~~((new Date()).getTime() / 1000)
  }
  return jwt.sign(payload, jwtConfig.secret)
}

module.exports = router
