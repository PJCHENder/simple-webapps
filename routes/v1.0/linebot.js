const express = require('express')
const router = express.Router({mergeParams: true})
// const bodyParser = require('body-parser')
// const jsonParser = bodyParser.json()
const line = require('@line/bot-sdk')
const lineConfig = require('../../config/line')
// const passport = require('passport')
// const Model = require('../../models')

// POST /v1.0/linebot/webhook
router.post('/webhook', line.middleware(lineConfig), (req, res) => {
  console.log('req', req)
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
})

const client = new line.Client(lineConfig)

function handleEvent (event) {
  console.log('event', event)
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  })
}

module.exports = router
