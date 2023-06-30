#STAGE 1
FROM node:20.3.1 AS build
# install angular cli to run ng-build
WORKDIR /usr/src/app
RUN npm i @angular/cli

# copy all file to build the app
WORKDIR /usr/src
# copy LIBS to npm/ folder
COPY LIB/lbox-shared.tgz LIB/lbox-auth.tgz ./LIB/
# copy package.json to app/ folder
COPY archive.litskevich/LitArchive.APP/package.json archive.litskevich/LitArchive.APP/package-lock.json ./lit-archive/app/
# run `npm install` in app/ folder
WORKDIR /usr/src/lit-archive/app
RUN npm install
COPY archive.litskevich/LitArchive.APP/. .
RUN npm run build-prod

#STAGE 2
FROM nginx:latest
COPY archive.litskevich/LitArchive.APP/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/lit-archive/app/dist/lit-archive-app /usr/share/nginx/html
