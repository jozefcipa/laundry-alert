const dotenv = require('dotenv')
const path = require('path')

// load env config
dotenv.config({ path: path.resolve(__dirname, '.env') })

function requireEnv(name) {
  const value = process.env[name]
  if (value) {
    return value
  }

  throw new Error(`Environment variable "${name}" missing.`)
}

module.exports = {
  vapid: {
    publicKey: requireEnv('VAPID_PUBLIC_KEY'),
    privateKey: requireEnv('VAPID_PRIVATE_KEY'),
    email: 'cipa.jozef@gmail.com',
  },
  api: {
    port: process.env.PORT ?? 1234,
  },
  gpio: {
    ledPin: 16
  }
}
