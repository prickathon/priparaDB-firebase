FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm i -g firebase-tools