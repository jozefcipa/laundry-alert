const gpio = require('./gpio')
const config = require('../config')
const logger = require('./logger')

class PhotoResistor {
  PIN = config.gpio.photoResistorPin

  async read() {
    logger.debug('Reading photoresistor')
    return await gpio.readPin(this.PIN)
  }
}

module.exports = new PhotoResistor()