const URL = 'http://192.168.0.103'; // todo 192.168.0.1/check ? it will just return something

(async () => {
  // cancel the request after 1s to avoid endless waiting
  const controller = new AbortController()
  const loadingScreen = document.getElementById('loading')
  const errorScreen = document.getElementById('error')
  const description = document.getElementById('description')

  try { 
    // check if the web is accessible
    setTimeout(() => controller.abort(), 1000)
    await fetch(URL, { signal: controller.signal })
    // redirect if available
    window.location = URL
  } catch {
    // show error message
    loadingScreen.style.display = 'none'
    errorScreen.style.display = 'block'
    description.innerHTML = `
    Device not found on the network 🫣<br><br>
    <small>Maybe you're on connected to a different network? Check your Wi-FI connection and try again.</small>
    `
  }
})()