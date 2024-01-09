LED_PIN ?= 16
ORANGE_PI_IP_ADDR ?= 192.168.0.100

deps:
	cd ./api && npm install

deps/prod:
	cd ./api && npm install --omit=dev
	npm install -g pm2

api/prod:
	pm2 start ecosystem.config.js

api/register-launcher:
	@pm2 install pm2-logrotate && \
	/bin/bash ./pm2-logrotate-config.sh && \
	pm2 save && \
	pm2 startup

api/dev:
	node ./api/src/index.js | node ./api/node_modules/.bin/pino-pretty

api/init-db:
	node ./api/src/migrations/init.js | node ./api/node_modules/.bin/pino-pretty

web:
	npx serve ./web

deploy:
	rsync -r \
		--exclude-from .rsyncignore \
		--include-from .rsyncinclude \
		root@:$(ORANGE_PI_IP_ADDR)/home/orangepi/laundry-alert

gpio/test:
	@gpio readall && \
	gpio mode $(LED_PIN) out  && \
	gpio write $(LED_PIN) 1 && \
	sleep 1 && \
	gpio write $(LED_PIN) 0

ssl/generate:
	# TODO: move SSL dir to ./nginx/ssl
	# TODO: finish command, to save files with specific name into ./ssl
	mkcert 192.168.0.100

	# then restart nginx
