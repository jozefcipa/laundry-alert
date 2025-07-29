const API_URL = 'https://192.168.0.100'

export async function findDeviceOnNetwork(): Promise<
  { isWashing: boolean } | false
> {
  try {
    // check if the web is accessible
    // cancel the request after 3s to avoid endless waiting
    const controller = new AbortController()
    setTimeout(() => controller.abort('Device lookup timeout'), 3000)
    const response = await fetch(API_URL, { signal: controller.signal }).then(
      (res) => res.json(),
    )

    if (response.name !== 'laundry-alert-api') {
      console.warn(`Unknown device found at address ${API_URL}`)
      return false
    }

    return response
  } catch (err) {
    console.error('Error ocurred while finding device: ', err)
    return false
  }
}

export async function subscribeToNotifications(subscription: PushSubscription) {
  await fetch(`${API_URL}/notifications/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
}
