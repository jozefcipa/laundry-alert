const gpio = require('./gpio')
const config = require('../config')

class StatusLed {
  PIN = config.gpio.ledPin
  turnedOn = false

  async toggle() {
    this.turnedOn = !this.turnedOn
    console.log(`led toggle ${this.turnedOn ? 'OFF' : 'ON'}`)
    await gpio.writePin(this.PIN, this.turnedOn ? 1 : 0)
  }
}

module.exports = new StatusLed()