const gpio = require('./gpio')
const config = require('../config')

class StatusLed {
  PIN = config.gpio.ledPin
  turnedOn = false

  async toggle() {
    if (this.turnedOn) {
      this.turnOff()
    } else {
      this.turnOn()
    }
  }

  async turnOn() {
    // avoid expensive GPIO call if we already have the LED in the desired state
    if (this.turnedOn) {
      return
    }
    console.log(`Changing LED to ON`)
    await gpio.writePin(this.PIN, 1)
    this.turnedOn = true
  }

  async turnOff() {
    // avoid expensive GPIO call if we already have the LED in the desired state
    if (!this.turnedOn) {
      return
    }
    console.log(`Changing LED to OFF`)
    await gpio.writePin(this.PIN, 0)
    this.turnedOn = false
  }
}

module.exports = new StatusLed()