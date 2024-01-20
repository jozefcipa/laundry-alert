const { readFile, writeFile } = require('node:fs/promises')
const { join } = require('path')

// A simple script to check whether the SSL certificates should be renewed
// For simplicity, the renewal happens once a year,
// but the certificate should be valid for 2 years and 3 months (default `mkcert` settings)

const availableActions = ['write', 'check']
const stateFilePath = join(__dirname, '../ssl-state.json')

;(async ([action]) => {
  if (!availableActions.includes(action)) {
    console.error(`Usage: node certificate-manager [${availableActions.join('|')}]`)
    process.exit(1)
  }

  if (action === 'write') {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)

    await writeFile(stateFilePath, JSON.stringify({
      nextSSLRenewalDate: date,
    }))
  } else if (action === 'check') {
    try {
      const today = new Date()
      const stateFile = JSON.parse((await readFile(stateFilePath)).toString())
      const shouldRenew = today > new Date(stateFile.nextSSLRenewalDate)

      process.stdout.write(shouldRenew ? '1' : '0')
    } catch (err) {
      process.stdout.write('1')
    }
  } else {
    console.error(`Not implemented action "${action}"`)
    process.exit(1)
  }
})(process.argv.slice(2))