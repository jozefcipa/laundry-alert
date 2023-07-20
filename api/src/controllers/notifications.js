const { saveSubscription } = require('../services/db')

async function subscribe(req, res) {
  // todo: some basic validation

  console.log('Creating subscription', req.body)

  // save notification token in database
  saveSubscription(JSON.stringify(req.body))

  res.status(201).send()
}

module.exports = {
  subscribe,
}
