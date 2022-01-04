# FROM node:16.13.1-alpine

# WORKDIR /app

# COPY . .

# RUN npm install

# # ENV PORT=4000

# EXPOSE 4000

# CMD ["npm" ,"run","start"]

FROM node:16.13.1-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*",  "./"]

RUN npm install --silent && mv node_modules ../

COPY . .

EXPOSE 4000


CMD  ["npm","run", "start"]
