#!/bin/bash

pm2 set pm2-logrotate:max_size 500MB

# Run log rotate every 10 minutes,
# as the app is not running for too long (max several hours)
# and the default schedule is at the midnight
pm2 set pm2-logrotate:rotateInterval '*/10 * * * *'