const gpio = require('./gpio')
const config = require('../config')
const logger = require('./logger')

class PhotoResistor {
  PIN = config.gpio.photoResistorPin

  async read() {
    const value = await gpio.readPin(this.PIN)
    logger.debug({ value }, 'Reading photoresistor')
    return value
  }
}

module.exports = new PhotoResistor()