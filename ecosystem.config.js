module.exports = {
  apps : [{
    name: 'laundry-alert',
    script: './api/src/index.js',
    env: {
      LOG_LEVEL: 'info',
      NODE_ENV: 'production',
    },
    // we don't want to keep restarting the service
    // as it usually runs no more than 1h
    // if it fails, something's wrong anyway
    autorestart: false,
  }]
}
