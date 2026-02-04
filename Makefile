.DEFAULT_GOAL := deploy

deploy:
	cp ./dist/index.html /etc/nginx/sites-available