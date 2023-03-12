FROM node:17-alpine

RUN npm install --global nodemon

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 5000

