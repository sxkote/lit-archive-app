install-lbox:
	npm install ..\..\LIB\lbox-shared.tgz && npm install ..\..\LIB\lbox-auth.tgz

lint:
	ng lint

rebuild:
	ng build

docker-build: rebuild
	docker build -f "Dockerfile" -t lit-archive-app ../../

docker-save:
	docker save --output "\\litnas\shared\docker-images\lit-archive-app.tar" lit-archive-app

deploy-docker: docker-build docker-save

deploy-local: rebuild
	npm run build-prod

deploy-www: deploy-local
	del /s/q \\litnas\shared\websites\archive.litskevich.ru && \
	xcopy .\dist\lit-archive-app "\\litnas\shared\websites\archive.litskevich.ru" /E/H/Y/F

copy-www:
	xcopy .\dist\lit-archive-app '\\litnas\shared\temp\ttt\' /E/H/Y/F
del-www:
	del /s/q \\litnas\shared\temp\ttt\
