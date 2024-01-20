const os = require('os')
const state = require('../../state')

const apiStartTime = new Date()

const systemStartTime = new Date()
systemStartTime.setSeconds(systemStartTime.getSeconds() - os.uptime()) // current date - seconds since booting up

async function status(req, res) {
  res.json({
    name: 'laundry-alert-api',
    isWashing: state.isWashing,
    apiStartTime,
    systemStartTime,
  })
}

module.exports = { status }