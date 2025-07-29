const { exec } = require('child_process')

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

async function shutdown() {
  await command('sudo shutdown -h now')
}

async function getCpuTemperature() {
  try {
    const result = await command('vcgencmd measure_temp')
    return result.split('=')[1].trim()
  } catch (error) {
    console.error('Error getting CPU temperature:', error)
    return null
  }
}

module.exports = {
  command,
  shutdown,
  getCpuTemperature,
}