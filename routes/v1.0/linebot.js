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
  if (event.message.text === '開始') {
    event.reply('開始打怪').then(function (data) {
      // success
      task.start()
      bot.push('U14a11d23e77aaad34a5e9893f0570223', 'Task Start')
    }).catch(function (error) {
      // error
      console.error('error on message', error)
    })
  } else if (event.message.text === '結束') {
    event.reply('停止打怪').then(function (data) {
    // success
      task.stop()
      bot.push('U14a11d23e77aaad34a5e9893f0570223', 'Task Stop')
    }).catch(function (error) {
      // error
      console.error('error on message', error)
    })
  }
})

let task = cron.schedule('35,40,45,50,55 1,5,9,13,17,21 * * *', function () {
  bot.push('U14a11d23e77aaad34a5e9893f0570223', `該動起來了${new Date()}`)
  console.log('running a task', new Date())
}, true)

// POST /v1.0/linebot/webhook
router.post('/webhook', linebotParser)

module.exports = router
