const dotenv = require('dotenv')
const path = require('path')

// load env config
dotenv.config({ path: path.resolve(__dirname, '.env') })

function requireEnv(name, defaultVal) {
  const value = process.env[name]
  if (value || defaultVal) {
    return value ?? defaultVal
  }

  throw new Error(`Environment variable "${name}" missing.`)
}

module.exports = {
  env: process.env.NODE_ENV,
  vapid: {
    publicKey: requireEnv('VAPID_PUBLIC_KEY'),
    privateKey: requireEnv('VAPID_PRIVATE_KEY'),
    email: 'cipa.jozef@gmail.com',
  },
  api: {
    port: process.env.PORT ?? 1234,
    logLevel: process.env.LOG_LEVEL ?? 'info',
  },
  gpio: {
    ledPin: requireEnv('LED_PIN', 29),
    photoResistorPin: requireEnv('PHOTORESISTOR_PIN', 15),
  }
}
