api/install: ./api/package.json ./api/node_modules
	cd ./api && npm install

api:
	# TODO: pm2
	LOG_LEVEL=info node ./api/src/index.js

api/dev:
	node ./api/src/index.js | ./api/node_modules/.bin/pino-pretty

client:
	npx serve ./client

deploy:
	rsync -r --exclude node_modules --exclude data.db ./ root@192.168.0.234:/home/orangepi/laundry-alert

ssl/generate:
	echo "not implemented" # TODO