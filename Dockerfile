
FROM node:16.13.1-alpine

ENV PORT=4000

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY ["package*.json",  "./"]

RUN npm install && npm audit fix && npm cache clean --force

COPY . .

EXPOSE $PORT

CMD  ["npm","run", "start"]
