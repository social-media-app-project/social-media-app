# Stage 1
FROM node:19-alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build 

#start the command to start the app
CMD [ "npm", "run" ,"start" ]
