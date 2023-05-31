FROM node:17-alpine


COPY client /app

WORKDIR /app

RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

