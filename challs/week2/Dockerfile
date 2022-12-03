FROM node:16-alpine

COPY ./intermediate /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 8080
ENV FLAG Itemize{INSERT_FLAG_HERE}

RUN npm install --silent

CMD ["npm", "run", "start"]