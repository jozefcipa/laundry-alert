gconst express = require('express')
const cors = require('cors')
const config = require('../config')
const notificationsController = require('./controllers/notifications')
const statusController = require('./controllers/status')
const logger = require('../services/logger')

const app = express()
app.use(cors())
app.use(express.json())

// Define routes
app.get('/', statusController.status)
app.post('/notifications/subscribe', notificationsController.subscribe)
app.post('/system/shutdown', statusController.shutdown)

let server
function start() {
  server = app.listen(config.api.port, () => logger.info(`API is listening on 127.0.0.1:${config.api.port}\n`))
}

function stop() {
  if (server) {
    server.close()
  }
}

module.exports = {
  start,
  stop,
}
