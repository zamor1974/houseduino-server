FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN cd /app && npm install --production

EXPOSE 5700

CMD [ "npm", "run", "start" ]