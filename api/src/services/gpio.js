const logger = require('./logger')
const config = require('../config')
const { command } = require('./system')

function handleError(err) {
  if (config.env === 'PRODUCTION') {
    throw err
  }
}

async function check() {
  try {
    await command(`gpio readall`)
    return true
  } catch(err) {
    logger.error(err, 'GPIO not available')
    handleError(err)
  }
}

async function setPinMode(pin, mode) {
  try {
    return await command(`gpio mode ${pin} ${mode}`)
  } catch(err) {
    logger.error({ err, pin, mode }, 'Failed to set pin mode')
    handleError(err)
  }
}
    
async function writePin(pin, value) {
  try {
    return await command(`gpio write ${pin} ${value}`)
  } catch(err) {
    logger.error({ err, pin, value }, 'Failed to write pin value')
    handleError(err)
  }
}

async function readPin(pin) {
  try {
    const value = await command(`gpio read ${pin}`)
    return value == 1
  } catch(err) {
    logger.error({ err, pin }, 'Failed to read pin value')
    handleError(err)
  }
}

module.exports = {
  check,
  setPinMode,
  writePin,
  readPin,
}