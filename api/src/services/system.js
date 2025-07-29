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

module.exports = {
  command,
  shutdown,
}