deps:
	cd ./api && npm install

deps/prod:
	cd ./api && npm install --omit=dev

api/prod:
	# TODO: pm2
	LOG_LEVEL=info node ./api/src/index.js

api/dev:
	node ./api/src/index.js | node ./api/node_modules/.bin/pino-pretty

api/init-db:
	node ./api/src/migrations/init.js | node ./api/node_modules/.bin/pino-pretty

web:
	npx serve ./web

deploy:
	rsync -r --exclude-from .rsyncignore ./api ./Makefile ./README.md ./nginx .crontab root@192.168.0.100:/home/orangepi/laundry-alert

crontab/install:
	crontab < /home/orangepi/laundry-alert/.crontab

gpio/test:
	# TODO: implement
	echo "Test"

ssl/generate:
	# TODO: move SSL dir to ./nginx/ssl
	# TODO: finish command, to save files with specific name into ./ssl
	mkcert 192.168.0.100

	# then restart nginx
