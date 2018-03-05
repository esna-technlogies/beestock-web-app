FROM node:8

WORKDIR /app

COPY . /app

EXPOSE 9090

RUN npm install http-server -g

RUN npm install && npm run build

CMD http-server ./dist
