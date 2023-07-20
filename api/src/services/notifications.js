const webPush = require('web-push')
const config = require('../config')

// initialize VAPID
webPush.setVapidDetails(
  `mailto:${config.vapid.email}`,
  config.vapid.publicKey,
  config.vapid.privateKey,
)

async function sendNotification(payload, subscription) {
  await webPush.sendNotification(subscription, JSON.stringify(payload))
}

module.exports = {
  sendNotification,
}