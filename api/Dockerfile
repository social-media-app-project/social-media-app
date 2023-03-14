FROM node:19.7-alpine3.16

WORKDIR /app
COPY package.json .
COPY package-lock.json . 

RUN npm install 

COPY . .

EXPOSE 3002

CMD ["npm", "run", "dev"]