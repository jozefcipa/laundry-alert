const { saveSubscription } = require('../../services/db')
const notifications = require('../../services/notifications')
const logger  = require('../../services/logger')

async function subscribe(req, res) {
  // todo: some basic validation
  const subscription = req.body

  logger.info('Creating subscription', subscription)

  // save notification token in database
  saveSubscription(JSON.stringify(subscription))

  // send confirmation notification
  await notifications.sendNotification({
    title: 'Yay, subscribed 👀',
    body: "Now you will always know when the laundry is ready 🙈",
    type: 'subscription-confirmed'
  }, subscription)

  res.status(201).send()
}

module.exports = {
  subscribe,
}
