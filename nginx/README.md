# Nginx Proxy

A simple proxy server to handle SSL termination and forward requests to the Node.js API on `http://localhost:1234`

## SSL
- Nginx & HTTPS
  - custom Certificate Authority
    - `mkcert`
    - installed root certificate on iOS device to allow HTTPS