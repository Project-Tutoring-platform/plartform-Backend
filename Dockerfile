# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.15.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production
ENV CLOUD_SQL_CONNECTION_NAME iconic-monitor-418400:asia-east1:platform-mysql

WORKDIR /app
RUN wget  https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.10.1/cloud-sql-proxy.linux.amd64 -O cloud_sql_proxy
RUN chmod +x cloud_sql_proxy

COPY package.*json /app
RUN npm install 

USER node

COPY . /app
EXPOSE 3000

CMD ["sh", "-c", "./cloud_sql_proxy $CLOUD_SQL_CONNECTION_NAME & npm run start & node app.js"]
