const logger = require('./services/logger')

class State {
  state = {
    // since we have only one photoresistor to detect when the washing is done
    // we will only recognize two states - whether the washing is in progress or not
    // By default washing is automatically considered to be in progress
    isWashing: true
  }

  get isWashing() {
    return this.state.isWashing
  }

  setIsWashing(isWashing) {
    logger.info(`Washing status changed to WASHING=${isWashing}`)
    this.state.isWashing = isWashing
  }
}

module.exports = new State()