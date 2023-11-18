const state = require('../state')
const db = require('../services/db')
const logger = require('../services/logger')
const notifications = require('../services/notifications')
const photoResistor = require('../services/photoresistor')

async function handler() {
  // if photo resistor sends 1, it means the "washing done" LED is turned on
  const isWashingDone = await photoResistor.read()

  // if the state hasn't changed, do nothing
  if (state.isWashing === !isWashingDone) {
    return
  }

  // update state
  state.setIsWashing(!isWashingDone)

  if (isWashingDone) {
    const subscribers = await db.listAllSubscriptions()
    await Promise.all(subscribers.map(async subscriber => {
      await notifications.sendNotification({
        title: 'Laundry is done ✅',
        body: 'Go get it before it starts to stink!',
        type: 'laundry-done'
      }, subscriber)
    }))
  }
}

module.exports = {
  handler,
  period: 5000, // 5s
}