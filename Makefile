api/install: ./api/package.json ./api/node_modules # TODO: Doesn't work
	cd ./api && npm install

api:  # TODO: doesn't work
	# TODO: pm2
	LOG_LEVEL=info node ./api/src/index.js

api/dev:
	node ./api/src/index.js | ./api/node_modules/.bin/pino-pretty

client:
	npx serve ./client

deploy:
	rsync -r --exclude node_modules --exclude data.db --exclude .env ./ root@192.168.0.100:/home/orangepi/laundry-alert

ssl/generate:
	# TODO: finish command, to save files with specific name into ./ssl
	mkcert 192.168.0.100

	# then restart nginx