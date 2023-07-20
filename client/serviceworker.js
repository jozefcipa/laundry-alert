self.addEventListener('push', async event => {
  const { title, body, type } = await event.data.json()
  self.registration.showNotification(title, {
    body,
  })

  if (type === 'laundry-done') {
    const channel = new BroadcastChannel('service-worker')
    channel.postMessage({
      type: 'laundry-done'
    })
  }
})