FROM node:16-alpine

COPY ./server /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 8080

RUN npm install --silent

CMD ["npm", "run", "start"]
