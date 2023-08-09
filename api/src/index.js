const db = require('./services/db')
const api = require('./api')
const intervals = require('./intervals')
const gpio = require('./services/gpio')
const logger = require('./services/logger')
const led = require('./services/status-led')
const photoResistor = require('./services/photoresistor')

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
})()
