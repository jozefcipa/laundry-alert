const { exec } = require('child_process')
const logger = require('./logger')

async function command(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
          return reject(err)
      }
      if (stderr) {
          return reject(stderr)
      }

      resolve(stdout)
    })
  })
}

async function check() {
  try {
    await command(`gpio readall`)
    return true
  } catch(err) {
    logger.error('[ERR]:GPIO not available!')
    return false
  }
}

async function setPinMode(pin, mode) {
  try {
    return await command(`gpio mode ${pin} ${mode}`)
  } catch(err) {
    logger.error('Failed to set pin mode', { err, pin, mode })
  }
}
    
async function writePin(pin, value) {
  try {
    return await command(`gpio write ${pin} ${value}`)
  } catch(err) {
    logger.error('Failed to write pin value', { err, pin, value })
  }
}

async function readPin(pin) {
  try {
    const value = await command(`gpio read ${pin}`)
    return value == 1
  } catch(err) {
    logger.error('Failed to read pin value', { err, pin })
  }
}

module.exports = {
  check,
  setPinMode,
  writePin,
  readPin,
}