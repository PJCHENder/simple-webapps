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
  // if (event.message.text === '微寶覺醒') {
  //   event.reply('收到').then(function (data) {
  //     // success
  //     task.start()
  //     bot.push('U14a11d23e77aaad34a5e9893f0570223', '微寶出任務')
  //   }).catch(function (error) {
  //     // error
  //     console.error('error', error)
  //   })
  // } else if (event.message.text === '微寶睡覺') {
  //   event.reply('收到').then(function (data) {
  //   // success
  //     task.stop()
  //     bot.push('U14a11d23e77aaad34a5e9893f0570223', '微寶結束任務')
  //   }).catch(function (error) {
  //     // error
  //     console.error('error', error)
  //   })
  // } else {
  //   event.reply('這我不理解').then(function (data) {
  //   // success
  //   }).catch(function (error) {
  //     // error
  //     console.error('error', error)
  //   })
  // }
})

// let task = cron.schedule('50,55,59 1,5,9,13,17,21 * * *', function () {
//   bot.push('U14a11d23e77aaad34a5e9893f0570223', '該動起來了')
//   console.log('running a task', new Date())
// }, true)

// POST /v1.0/linebot/webhook
router.post('/webhook', linebotParser)

module.exports = router
