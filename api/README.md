# API

This is a Node.js app that controls the whole project.
It provides an API for **registering notification tokens**, communicates with the **GPIO** when reading the sensor values, and sends **push notifications** when the washing cycle ends.

### Technologies
- Node.js & Express router
- SQLite database (for storing device tokens)
- Custom wrapper around [WiringPi](https://github.com/WiringPi/WiringPi) GPIO library
- Push notifications using [VAPID](https://www.npmjs.com/package/web-push)

### How to run
- Install npm dependencies - `npm install`
- Generate VAPID keys (e.g. here [vapidkeys.com](https://vapidkeys.com/) or programmatically using the `web-push` library)
- Copy `.env.example` to `.env` and configure values
- Run SQLite migrations - `make api/init-db`
- Start the API - `make api/dev` (**Note**: no `nodemon` right now, the process needs to be restarted after every change)


### Endpoints

`GET /` - Returns API status, if the service is running

`POST /notifications/subscribe` - Subscribe to push notifications