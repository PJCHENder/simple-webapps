const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Model = require('../models')
const jwtConfig = require('../config/jwt')

/**
 * passport.use('驗證策略名稱', '想建立的策略類型')
 * passReqToCallback: 讓我們在後面的 callback 中可以使用 req 參數
**/

//  Passport Initialization
passport.serializeUser(function (user, done) {
  done(null, user._id)
})
passport.deserializeUser(function (id, done) {
  Model.User.findById(id, function (err, user) {
    done(err, user)
  })
})

let jwtStrategy = new JwtStrategy({
  secretOrKey: jwtConfig.secret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'}),
    ExtractJwt.fromAuthHeader()
  ])
}, function (payload, done) {
  Model.User.findOne({email: payload.sub}, function (err, user) {
    // 伺服器錯誤
    if (err) return done(err)

    // 找不到使用者
    if (!user) return done(null, false, {message: 'JWT Verified, but user not found'})
    // if (payload.sub !== user.facebookId) return done(null, false, {message: 'Wrong JWT Token'})

    // JWT 過期
    const exp = payload.exp
    const nbf = payload.nbf
    const curr = ~~(new Date().getTime() / 1000)
    if (curr > exp || curr < nbf) {
      return done(null, false, {message: 'Token Expired'})
    }

    // 找到使用者
    return done(null, user)
  })
})

passport.use('jwt', jwtStrategy)

module.exports = passport
