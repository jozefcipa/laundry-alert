const { db } = require('../services/db')

db.serialize(() => {
  db.run(`
  CREATE TABLE notification_tokens (
    subscription TEXT UNIQUE
  )
  `)
})
