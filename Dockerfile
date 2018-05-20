FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm i -g firebase-tools
RUN cd /app/functions; npm i