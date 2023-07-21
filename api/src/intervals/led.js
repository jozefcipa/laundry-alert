const ledService = require('../services/status-led')
const state = require('../state')

function handler() {
  // When the washing is in progress the LED is blinking, when it finishes, the LED stays turned ON
  if (!state.isWashing) {
    ledService.turnOn()
  } else {
    ledService.toggle()
  }
}

module.exports = {
  handler,
  period: 1000, // 1s
}