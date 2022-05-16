FROM node:14.16.0-alpine3.13

WORKDIR /app

COPY . /app

RUN npm install

RUN npm build

ENTRYPOINT npm start
