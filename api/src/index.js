const express = require('express')
const cors = require('cors')
const config = require('./config')
const notificationsController = require('./controllers/notifications')
const { db } = require('./services/db')
const led = require('./services/status-led')

const app = express()
app.use(cors())
app.use(express.json())

// Define routes
app.get('/', async (req, res) => {
  res.json({
    name: 'laundry-alert-api',
    isWashing: true // TODO: is washing?
    // TODO: maybe we can add here some GPIO status check
  })
})
app.post('/notifications/subscribe', notificationsController.subscribe)


// TODO: turn this off when the washing is done
const interval = setInterval(() => {
  led.toggle()
}, 1000)

function onClose() {
  console.log('Stopping server...')

  db.close()
  clearInterval(interval)

  process.exit(0)
}

process.on('SIGINT', onClose)
process.on('SIGTERM', onClose)

app.listen(config.api.port, () => console.log(`listening on localhost:${config.api.port}`))