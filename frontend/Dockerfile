# Stage 1
FROM node:19-alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build 

# Stage 2
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=builder /app/build .

EXPOSE 3000

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
