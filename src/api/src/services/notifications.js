const webPush = require('web-push')
const config = require('../config')
const logger = require('./logger')

// initialize VAPID
webPush.setVapidDetails(
  `mailto:${config.vapid.email}`,
  config.vapid.publicKey,
  config.vapid.privateKey,
)

async function sendNotification(payload, subscription) {
  logger.debug(`Sending notification [payload=${JSON.stringify(payload)}]`)
  await webPush.sendNotification(subscription, JSON.stringify(payload))
}

module.exports = {
  sendNotification,
}