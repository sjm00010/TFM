# build stage
FROM node:14.16.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM httpd:2.4 as production-stage
COPY --from=build-stage /app/dist /usr/local/apache2/htdocs/
EXPOSE 80