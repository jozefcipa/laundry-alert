async function subscribe(req, res) {


  console.log('incoming data', req.body)
  // todo store this data as subscription in DB


  // maybe send out one notification as a confirmation
  // await sendNotification({title: "Hello World", body: 'eheeeeee'}, req.body)


  res.json({ ok: 1 })
}

module.exports = {
  subscribe,
}
