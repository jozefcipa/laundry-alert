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

async function setPinMode(pin, mode) {
  return await command(`gpio mode ${pin} ${mode}`) 
}
    
async function writePin(pin, value) {
  return await command(`gpio write ${pin} ${value}`) 
}

module.exports = {
  setPinMode,
  writePin,
}