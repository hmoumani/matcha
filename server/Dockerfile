FROM node:17-alpine


COPY server /app

WORKDIR /app

RUN npm install

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
