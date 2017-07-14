const express = require('express')
const router = express.Router({mergeParams: true})
const linebot = require('linebot')
const cron = require('node-cron')
const lineConfig = require('../../config/line')

const bot = linebot(lineConfig)
const linebotParser = bot.parser()


/**
 * Line Bot Listener
 */
bot.on('message', function (event) {
  console.log('event', event)
  event.reply(event.message.text).then(function (data) {
    // success
  }).catch(function (error) {
    // error
    console.error('error on message', error)
  })
})

let task = cron.schedule('50,55 1,5,9,13,17,21 * * *', function () {
  bot.push('U14a11d23e77aaad34a5e9893f0570223', `該動起來了${new Date()}`)
  console.log('running a task', new Date())
}, true)

// POST /v1.0/linebot/webhook
router.post('/webhook', linebotParser)

let isTaskStart = true

// GET /v1.0/linebot/
router.get('/', (req, res, next) => {
  if (isTaskStart) {
    task.stop()
    bot.push('U14a11d23e77aaad34a5e9893f0570223', 'Task Stop')
  } else {
    task.start()
    bot.push('U14a11d23e77aaad34a5e9893f0570223', 'Task Start')
  }

  return res.status(200).json({status: 200, message: `isTaskStart: ${isTaskStart}`, time: new Date()})
})

module.exports = router
