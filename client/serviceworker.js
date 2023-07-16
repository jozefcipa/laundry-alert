self.addEventListener("push", async event => {
  const { title, body } = await event.data.json()

  console.log('incoming', { title, body })

  // TODO: can we somehow handle clicking on the notification?

  self.registration.showNotification(title, {
    body,
  })
})