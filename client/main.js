// TODO: add a specific URL endpoint that will return something in order to avoid false positives in case
// 192.168.0.100 is used on a different network
const URL = 'http://192.168.0.1'

;(async () => {
  // cancel the request after 1s to avoid endless waiting
  const controller = new AbortController()
  const loadingScreen = document.getElementById('loading')
  const errorScreen = document.getElementById('error')
  const laundryScreen = document.getElementById('laundry')
  const status = document.getElementById('status')

  try { 
    // check if the web is accessible
    setTimeout(() => controller.abort(), 1000)
    await fetch(URL, { signal: controller.signal })
    
    // show laundry screen
    loadingScreen.style.display = 'none'
    laundryScreen.style.display = 'flex'
    status.innerHTML = 'Washing...'
  } catch {
    // show error message
    loadingScreen.style.display = 'none'
    errorScreen.style.display = 'block'
    status.innerHTML = `
    Device not found on the network 🫣<br><br>
    <small>Maybe you're on connected to a different network? Check your Wi-FI connection and try again.</small>
    `
  }


  // TODO: other logic here

  // if done
  // add class .done to body, show washing-done
})()