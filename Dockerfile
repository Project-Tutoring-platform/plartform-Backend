# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.15.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package.*json /app
RUN npm install 

USER node

COPY . /app
EXPOSE 3000

CMD ["node", "app.js"]
