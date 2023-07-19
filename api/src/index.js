const express = require('express')
const cors = require('cors')
const config = require('./config')
const notificationsController = require('./controllers/notifications')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.json({
    name: 'laundry-alert-api',
    // TODO: maybe we can add here some GPIO status check
  })
})

app.post('/notifications/subscribe', notificationsController.subscribe)

app.listen(config.api.port, () => console.log(`listening on localhost:${config.api.port}`))