FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8081
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
