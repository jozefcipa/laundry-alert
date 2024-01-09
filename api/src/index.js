const db = require('./services/db')
const api = require('./api')
const intervals = require('./intervals')
const gpio = require('./services/gpio')
const logger = require('./services/logger')
const led = require('./services/status-led')
const photoResistor = require('./services/photoresistor')
const notifications = require('./services/notifications')

function onClose() {
  logger.info('Stopping server...')
  api.stop()
  intervals.stop()
  led.turnOff()
  db.stop()
}
process.on('SIGINT', onClose)
process.on('SIGTERM', onClose)

;(async () => {
  // verify GPIO is available
  await gpio.check()

  // configure GPIO pins
  await gpio.setPinMode(led.PIN, 'out')
  await gpio.setPinMode(photoResistor.PIN, 'in')

  // start DB
  db.start()

  // start intervals
  intervals.start()

  // start API
  api.start()

  // Notify all phones that the program has started
  const subscribers = await db.listAllSubscriptions()
  await Promise.all(subscribers.map(async subscriber => {
    await notifications.sendNotification({
      title: 'LaundryAlert is on 👀',
      body: 'Yay, the app is up and running. You will be notified when the washing ends.',
      type: 'init'
    }, subscriber)
  }))
})()
