const state = require('../../state')

async function status(req, res) {
  res.json({
    name: 'laundry-alert-api',
    isWashing: state.isWashing,
  })
}

module.exports = { status }