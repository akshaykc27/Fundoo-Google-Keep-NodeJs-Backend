FROM node:10

WORKDIR /usr/src/chatappLS

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 4000 

CMD [ "node", "server.js" ]