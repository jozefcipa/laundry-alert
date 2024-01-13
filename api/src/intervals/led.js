const ledService = require('../services/status-led')
const state = require('../state')
const { sleep } = require('../helpers/sleep')

async function handler() {
  // When the washing is in progress the LED is blinking, when it finishes, the LED stays turned ON
  if (!state.isWashing) {
    await ledService.turnOn()
  } else {
    await ledService.turnOn()
    await sleep(200)
    await ledService.turnOff()
  }
}

module.exports = {
  handler,
  period: 1000, // 1s
}