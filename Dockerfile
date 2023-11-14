FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i
COPY . .
ENV PORT = 80
EXPOSE 80
ENTRYPOINT node index.js


#docker build . -t pitchnhire/mongo-rest:latest
#docker push pitchnhire/mongo-rest:latest
