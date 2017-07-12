/**
 * Check Line Config Parameter on
 * https://developers.line.me/ba/u2f47f1117015243b7c0f2c087cc9c66c/bot
 */

module.exports = {
  config: {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  }
}
