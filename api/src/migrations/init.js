const { start } = require('../services/db')

const db = start()

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS notification_tokens (
    subscription TEXT UNIQUE
  )
  `)
})
