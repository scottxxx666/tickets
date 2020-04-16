FROM node:13.13.0-alpine3.10 as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . ./
RUN yarn build

FROM nginx:1.17.9-alpine as deploy-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY site.conf /etc/nginx/conf.d
COPY --from=build-stage /app/build /var/www/
