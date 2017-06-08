const mongoose = require('mongoose')
const connectionString = require('../config/database')[process.env.NODE_ENV || 'development'].connection

