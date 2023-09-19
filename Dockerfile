# https://dev.to/ysmnikhil/how-to-build-with-react-or-vue-with-vite-and-docker-1a3l
FROM node:18.17.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
