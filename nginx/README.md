# NGINX Proxy

We use NGINX as a simple proxy server to handle SSL termination and forward requests to the Node.js API running on `http://localhost:1234`.

## Generating SSL certificates
We use [mkcert](https://github.com/FiloSottile/mkcert) utility to generate the SSL certificates.

#### Steps

**On local machine**
- `mkcert -install` - This generate a root CA certificate that will be used to generate SSL certificates
- Now we need to register the root CA certificate in our mobile phone (more info [below](#self-signed-certificates-on-a-phone))
- *`make ssl/copy-root-ca` - This copies over the root CA certificates into `./nginx/ssl` so it can get transfered to OrangePi by running `make deploy`.* <br>
💡This step is automatically made when deploying!

**On OrangePi**

- `make ssl/generate` - Generate SSL certificates and stores them into `./nginx/ssl/`
- `make nginx/setup` - This creates a symlink of `./nginx/ssl/server.conf` to `/etc/nginx/sites-enabled/server.conf` and restarts the NGINX.

## Self-signed certificates on a phone

Follow the steps described [here](https://jozefcipa.com/blog/self-signed-ssl-certificates-on-ios) to see how to register a self-signed certificate.