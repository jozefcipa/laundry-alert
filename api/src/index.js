const db = require('./services/db')
const api = require('./api')
const intervals = require('./intervals')
const gpio = require('./services/gpio')

function onClose() {
  console.log('Stopping server...')
  api.stop()
  intervals.stop()
  db.stop()
}
process.on('SIGINT', onClose)
process.on('SIGTERM', onClose)

;(async () => {
  // verify GPIO is available
  await gpio.check()

  // start DB
  db.start()

  // start intervals
  intervals.start()

  // start API
  api.start()
})()
