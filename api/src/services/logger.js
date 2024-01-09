const pino = require('pino')
const config = require('../config')

module.exports = pino({ level: config.api.logLevel })