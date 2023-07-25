const ledInterval = require('./led')
const photoResistorInterval = require('./photoresistor')
const logger = require('../services/logger')

let blinkLed
let checkPhotoresistor

function start() {
  blinkLed = setInterval(ledInterval.handler, ledInterval.period)
  logger.info('LED interval started...')
  checkPhotoresistor = setInterval(photoResistorInterval.handler, photoResistorInterval.period)
  logger.info('Photoresistor interval started...')
}

function stop() {
  clearInterval(blinkLed)
  clearInterval(checkPhotoresistor)
}

module.exports = {
  start,
  stop,
}