const ledInterval = require('./led')
const photoResistorInterval = require('./photoresistor')

let blinkLed
let checkPhotoresistor

function start() {
  blinkLed = setInterval(ledInterval.handler, ledInterval.period)
  console.log('LED interval started...')
  checkPhotoresistor = setInterval(photoResistorInterval.handler, photoResistorInterval.period)
  console.log('Photoresistor interval started...')
}

function stop() {
  clearInterval(blinkLed)
  clearInterval(checkPhotoresistor)
}

module.exports = {
  start,
  stop,
}