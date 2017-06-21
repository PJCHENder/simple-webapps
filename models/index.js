const mongoose = require('mongoose')
const connectionString = require('../config/database')[process.env.NODE_ENV || 'development'].connection

const User = require('./user')
const Palette = require('./palette')
const debug = require('debug')('model')

// Fix mongoose Promise issue
mongoose.Promise = global.Promise

debug('connectionString', connectionString)

mongoose.connect(connectionString, function (err) {
  if (err) {
    console.error('connect to %s error: ', connectionString, err.message)
    process.exit(1)
  }
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = {
  User,
  Palette
}
