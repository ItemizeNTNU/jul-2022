FROM node:16-alpine

COPY ./intermediate /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 8080
ENV FLAG Itemize{l33t_gr1nch3n_3r_t1lb4k3_1gj3n}

RUN npm install --silent

CMD ["npm", "run", "start"]