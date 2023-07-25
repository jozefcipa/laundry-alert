const sqlite3 = require('sqlite3')
const path = require('path')
const assert = require('assert')
const logger = require('./logger')

let db = null

function start() {
  const database = sqlite3.verbose()
  db = new database.Database(path.resolve(__dirname, '../../.db', 'data.db'))
  logger.info('DB initialized...')
}

function stop() {
  if (db) {
    db.close()
  }
}

function saveSubscription(subscription) {
  assert(db !== null, 'DB not initialized')
  db.run('INSERT INTO notification_tokens (subscription) VALUES (?) ON CONFLICT (subscription) DO NOTHING', subscription)
}

async function listAllSubscriptions() {
  assert(db !== null, 'DB not initialized')
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notification_tokens', [], (err, rows) => {
      if (err) {
        return reject(err)
      }
      return resolve(rows.map(row => JSON.parse(row.subscription)))
    })
  })
}

module.exports = {
  start,
  stop,
  saveSubscription,
  listAllSubscriptions
}