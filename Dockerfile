FROM node:10.4-alpine

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm install --only=production

COPY ./src/ .

EXPOSE 8080

CMD [ "node", "app.js" ]
