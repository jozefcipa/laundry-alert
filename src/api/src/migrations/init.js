const { start } = require('../services/db')

const db = start()

db.serialize(() => {
  db.run(`
  CREATE TABLE notification_tokens (
    subscription TEXT UNIQUE
  )
  `)
})
