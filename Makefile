LED_PIN ?= 16
ORANGE_PI_IP_ADDR ?= 192.168.0.100

# Download production + develeopment NPM dependencies
deps:
	cd ./api && npm install

# Download production NPM dependencies
deps/prod:
	cd ./api && npm install --omit=dev
	npm install -g pm2

# Start the API with NODE_ENV=production
api/prod:
	pm2 start ecosystem.config.js

# Register pm2 startup launcher so the API will start automaticall after reboot
api/register-launcher:
	@pm2 install pm2-logrotate && \
	/bin/bash ./pm2-logrotate-config.sh && \
	pm2 save && \
	pm2 startup

# Run API locally
api/dev:
	node ./api/src/index.js | node ./api/node_modules/.bin/pino-pretty

# Initialize SQLite database
api/init-db:
	node ./api/src/migrations/init.js

# Serve web client application locally
web:
	npx serve ./web

# Copy the files from the local computer to RPi
deploy: ssl/copy-root-ca
	rsync -r \
		--exclude-from .rsyncignore \
		--progress \
		--rsh=ssh \
		. \
		laundry-alert:~/laundry-alert

# Copy the Root CA to the ./nginx/ssl folder so it gets copied over to RPi ... mkcert needs this to generate SSL certs
ssl/copy-root-ca:
	@cp -R "$(shell mkcert -CAROOT)/." ./nginx/ssl || true

# Generate SSL certificates for NGINX on RPi
ssl/generate:
	CAROOT=/home/laundryalert/laundry-alert/nginx/ssl ./bin/mkcert \
	-key-file ./nginx/ssl/cert.key -cert-file ./nginx/ssl/cert.pem $(ORANGE_PI_IP_ADDR) && \
	node ./bin/certificate-manager.js write

# Saves the next SSL certificate renewal date and generates the certificate if needed
ssl/certificate-manager:
	@if [ "$(shell node ./bin/certificate-manager.js check)" = "1" ]; then\
		$(MAKE) ssl/generate;\
	fi

# Configure NGINX server
# Needs to be ran as: "sudo make nginx/setup"
nginx/setup:
	ln -s /home/laundryalert/laundry-alert/nginx/server.conf /etc/nginx/sites-enabled/
	systemctl restart nginx.service

# Test whether GPIO works by blinking the LED
gpio/test:
	@gpio readall && \
	gpio mode $(LED_PIN) out  && \
	gpio write $(LED_PIN) 1 && \
	sleep 1 && \
	gpio write $(LED_PIN) 0

.PHONY: web
