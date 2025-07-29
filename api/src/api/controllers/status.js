const os = require('os')
const state = require('../../state')
const systemService = require('../../services/system')

const apiStartTime = new Date()

const systemStartTime = new Date()
systemStartTime.setSeconds(systemStartTime.getSeconds() - os.uptime()) // current date - seconds since booting up

async function status(req, res) {
  res.json({
    name: 'laundry-alert-api',
    isWashing: state.isWashing,
    cpuTemperature: await systemService.getCpuTemperature(),
    apiStartTime,
    systemStartTime,
  })
}

async function shutdown(req, res) {
  res.status(204).send({})
  setTimeout(() => {
    systemService.shutdown()
  }, 1000)
}

module.exports = { status, shutdown }