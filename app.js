/**
 * express and helper module
**/
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const debug = require('debug')('inspect')

/**
 * middleware
**/
const history = require('connect-history-api-fallback')
// const passport = require('./middlewares/passport')

// routes module
const index = require('./routes/index')
const api = require('./routes/v1.0/')

const app = express()


// 設定 view engine 和模版路徑
app.set('view engine', 'pug')
app.set('views', path.join('./views'))


// middleware
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, 'static')))

// app.use(passport.initialize())
// app.use(passport.session())

/**
 * routes
**/
app.use(history({
  index: '/',
  logger: debug.bind(console)
}))
app.use('/', index)

// 所有 /v1.0/ 都會進入 api 這支路由
app.use('/v1.0/', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/**
 * error handler
**/
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    status: err.status,
    message: err.message
  })
})

module.exports = app
