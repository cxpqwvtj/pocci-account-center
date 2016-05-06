#!/bin/bash
set -e

if [ -n "pocci-account-center/public$APP_BASE_URL" ]; then
	echo "deploy at $APP_BASE_URL"
fi

if [ ! -e 'pocci-account-center/public${APP_BASE_URL}/index.html' ]; then
	cd /pocci-account-center
	sed -i "s:var baseUrl = '';:var baseUrl = '${APP_BASE_URL}';:g" gulpfile.js
	node ./node_modules/gulp/bin/gulp.js
fi

exec "$@"
