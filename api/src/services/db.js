const sqlite = require('sqlite3')
const path = require('path')

const sqlite3 = sqlite.verbose()
const db = new sqlite3.Database(path.resolve(__dirname, '../../.db', 'data.db'))

function saveSubscription(subscription) {
  db.run('INSERT INTO notification_tokens (subscription) VALUES (?) ON CONFLICT (subscription) DO NOTHING', subscription)
}

async function listAllSubscriptions() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notification_tokens', [], (err, rows) => {
      if (err) {
        return reject(err)
      }
      return resolve(rows)
    })
  })
}

module.exports = {
  db,
  saveSubscription,
  listAllSubscriptions
}