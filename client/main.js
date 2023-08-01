const API_URL = 'http://192.168.0.100'
// const API_URL = 'http://localhost:1234'
const VAPID_PUBLIC_KEY = 'BLwKBVim7SJHtsVqxpiXKhyp38br6vBCGBeX6FKYPuBLSlpfpthU_JEzCFjh6DewQXMut1mzCBR5h7isxZQEebA'

const loadingScreen = document.getElementById('loading')
const errorScreen = document.getElementById('error')
const laundryScreen = document.getElementById('laundry')
const statusLabel = document.getElementById('status')
const subscribeBtn = document.getElementById('subscribe-notifications')
const washingProgress = document.getElementById('washing-progress')
const washingDone = document.getElementById('washing-done')

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/")
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function findDeviceOnNetwork() {
  try {
    // check if the web is accessible
    // cancel the request after 3s to avoid endless waiting
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 3000)
    const response = await fetch(API_URL, { signal: controller.signal }).then(res => res.json())

    if (response.name !== 'laundry-alert-api') {
      console.warn(`Unknown device found at address ${API_URL}`)
      return false
    }

    return response
  } catch (err) {
    console.error('Error ocurred while finding device', err)
    return false
  }
}

async function handleSubscribe(serviceWorker) {
  // Triggers popup to request access to send notifications
  const permissionsResult = await window.Notification.requestPermission()
  if (permissionsResult !== 'granted') {
    console.warn('Notification permission not granted', { permissionsResult })
    return
  }

  console.log('Subscribing to notifications')
  const subscription = await serviceWorker.pushManager.subscribe({
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    userVisibleOnly: true,
  })

  console.log('Sending subscription to the API')
  await fetch(`${API_URL}/notifications/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
}

function showWashingDoneScreen() {
  washingProgress.style.display = 'none'
  washingDone.style.display = 'flex'
  statusLabel.innerHTML = 'Washing done. Go get it!'
  document.body.classList.add('done')
}

;(async () => {

  const deviceInfo = await findDeviceOnNetwork()

  // hide loading screen
  loadingScreen.style.display = 'none'

  if (!deviceInfo) {
    // show error message
    errorScreen.style.display = 'block'
    statusLabel.innerHTML = `
    Device not found on the network 🫣<br><br>
    <small>
      Maybe you're on connected to a different network?<br>
      Check your Wi-Fi connection and try again.
    </small>
    `
    return
  }

  laundryScreen.style.display = 'flex'

  if (!deviceInfo.isWashing) {
    showWashingDoneScreen()
    return
  }

  // show laundry screen
  statusLabel.innerHTML = 'Washing...'

  // A service worker must be registered in order to send notifications on iOS
  const serviceWorker = await navigator.serviceWorker.register('./serviceworker.js', { scope: './' })

  // register
  subscribeBtn.addEventListener('click', async () => {
    try {
      await handleSubscribe(serviceWorker)
      subscribeBtn.innerHTML = 'Subscribed!'
    } catch(err) {
      statusLabel.innerHTML = `Error ocurred: "${err.message}"` // TODO: improve error handling
    }
  })

  const channel = new BroadcastChannel('service-worker')
  channel.addEventListener('message', event => {
    if (event.data.type === 'laundry-done') {
      showWashingDoneScreen()
    }
  })
})()