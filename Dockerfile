FROM node:latest

RUN mkdir /src
WORKDIR /src

RUN npm install nodemon -g

EXPOSE 3000

CMD npm start
