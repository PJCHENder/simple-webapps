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
    text: ['安安', '我在這', '不要怕，有我在', '提供免費代客刻印', '提供免費代客衝裝', '10+1 抽下去了拉']
  },
  lineage: {
    image: ['唉唷，不錯嘛～', '阿不就好棒棒', '下次會更好', '非洲人了你', '這個小白臉'],
    text: ['放開那個女孩', '歡迎非洲族長', '記得補防曬', 'PK阿！', '沒人舉手是吧，那我點名了']
  }
}

/**
 * cron task
 */
let task = cron.schedule('50 1,5,9,13,17,21 * * *', function () {
  bot.push(groupId.lineage, '打王的時間到了')
  console.log('running a task', new Date())
}, true)

/**
 * Line Bot Listener
 */
bot.on('message', function (event) {
  let textMessage = event.message.text

  // For lineage group
  if (event.source.groupId === groupId.lineage) {
    // For text message
    if (event.message.type === 'text') {

      if (isFound(textMessage, ['微寶覺醒', '微寶起床', 'wavbo run start'])) {
         event.reply('收到').then(function (data) {
          task.start()
          bot.push(groupId.lineage, '微寶出任務')
        }).catch(function (error) {
          console.error('error', error)
        })
      } else if (isFound(textMessage, ['微寶睡覺', 'wavbo run sleep', 'wavbo run stop'])) {
        event.reply('收到').then(function (data) {
          task.stop()
          bot.push(groupId.lineage, '微寶結束任務，大家晚安')
        }).catch(function (error) {
          console.error('error', error)
        })
      } else {
        if (isFound(textMessage, ['琳娜', '一邊一國', '霜刃'])) {
          bot.push(groupId.lineage, replyMessage.lineage.text[Math.floor(Math.random() * replyMessage.lineage.text.length)])
        }

        if (isFound(textMessage, ['wavbo', '微寶'])) {
          bot.push(groupId.lineage, replyMessage.wavbo.text[Math.floor(Math.random() * replyMessage.lineage.text.length)])
        }
        
        if (isFound(textMessage, ['紅寶', '藍鑽', '鑽石'])) {
          bot.push(groupId.lineage, '10+1 抽下去了拉')
        }

        if (isFound(textMessage, ['rm -rf', 'sudo kill'])) {
          bot.leaveGroup(groupId.lineage)
        }
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
function isFound (targetString, patternArray) {
  return patternArray.some( word => {
    let regex = new RegExp(word, 'gi')
    return targetString.match(regex)
  })
}

module.exports = router
