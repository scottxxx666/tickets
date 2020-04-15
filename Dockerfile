FROM node:13.13.0-alpine3.10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN yarn install --production
COPY ./ /app/
RUN yarn build

FROM nginx:1.17.9-alpine as deploy-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY site.conf /etc/nginx/conf.d
COPY build/ /var/www/
