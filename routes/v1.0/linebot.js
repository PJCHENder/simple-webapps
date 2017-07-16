const express = require('express')
const router = express.Router({mergeParams: true})
const linebot = require('linebot')
const cron = require('node-cron')
const lineConfig = require('../../config/line')

const bot = linebot(lineConfig)
const linebotParser = bot.parser()

const groupId = {
  lineage: 'Cb04a70d54d7b53ba5764e8b423d15b84'
}

const userId = {
  pjchender: 'U14a11d23e77aaad34a5e9893f0570223'
}

const replyMessage = {
  wavbo: {
    text: ['安安', '我在這']
  },
  lineage: {
    image: ['唉唷，不錯嘛～', '阿不就好棒棒', '下次會更好', '非洲人了你', '你這個小白臉'],
    text: ['放開那個女孩', '歡迎非洲族長', '記得補防曬', 'PK阿！']
  }
}

/**
 * cron task
 */
let task = cron.schedule('50 1,5,9,13,17,21 * * *', function () {
  bot.push(groupId.lineage, '該動起來了')
  console.log('running a task', new Date())
}, true)

/**
 * Line Bot Listener
 */
bot.on('message', function (event) {
  // For lineage group
  if (event.source.groupId === groupId.lineage) {
    // For text message
    if (event.message.type === 'text') {
      if (event.message.text === '微寶覺醒' || event.message.text === 'wavbo run start') {
        event.reply('收到').then(function (data) {
          task.start()
          bot.push(groupId.lineage, '微寶出任務')
        }).catch(function (error) {
          console.error('error', error)
        })
      } else if (event.message.text === '微寶睡覺' || event.message.text === 'wavbo run sleep') {
        event.reply('收到').then(function (data) {
          task.stop()
          bot.push(groupId.lineage, '微寶結束任務')
        }).catch(function (error) {
          console.error('error', error)
        })
      } else if (contains(event.message.text, ['琳娜', '一邊一國', '霜刃'])) {
        bot.push(groupId.lineage, replyMessage.lineage.text[Math.floor(Math.random() * replyMessage.lineage.text.length)])
      } else if (contains(event.message.text, ['wavbo', '微寶'])) {
        bot.push(groupId.lineage, replyMessage.wavbo.text[Math.floor(Math.random() * replyMessage.lineage.text.length)])
      }
    } else if (event.message.type === 'image') {
      bot.push(groupId.lineage, replyMessage.lineage.image[Math.floor(Math.random() * replyMessage.lineage.image.length)])
    }
  }
})

// POST /v1.0/linebot/webhook
router.post('/webhook', linebotParser)

/**
 * Function
**/
function contains (target, pattern) {
  let contained = false
  pattern.forEach(function (word) {
    if (target.includes(word)) {
      contained = true
    }
  })
  return contained
}

module.exports = router
