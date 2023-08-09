# API

- API
  - nodejs app
  - SQLite (for storing device tokens)
  - gpio C library
  - express API
  - controlling GPIO
  - sending push notifications
    - vapid

# setup
copy .env.example to .env and fill in the values

run sqlite "migration"

how to generate VAPID keys


### SSL
- Nginx & HTTPS
  - custom Certificate Authority
    - `mkcert`
    - installed root certificate on iOS device to allow HTTPS