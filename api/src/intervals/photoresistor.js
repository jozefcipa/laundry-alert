const state = require('../state')
const db = require('../services/db')
const notifications = require('../services/notifications')

let i = 0

async function handler() {
  console.log('checking photoresitor')

  // TODO: check GPIO
  // TODO simulate finished washing

  if (i > 2 && state.isWashing) {
    state.setIsWashing(false)

    const subscribers = await db.listAllSubscriptions()
    await Promise.all(subscribers.map(async subscriber => {
      await notifications.sendNotification({
        title: 'Laundry is done ✅',
        body: 'Go get it before it starts to stink!',
        type: 'laundry-done'
      }, subscriber)
    }))
  }

  // TODO: add a way to update the state after the washing has finished and then it would start again

  i++
}

module.exports = {
  handler,
  period: 5000, // 5s
}