# FROM ubuntu:jammy

# RUN apt-get update && apt-get install -y curl && \
#     curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
#     apt-get install -y nodejs && node -v && npm -v

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# COPY pnpm-*.yaml ./

RUN npm install

COPY . .

ENV PORT=4030

EXPOSE 4030

CMD [ "npm", "start" ]
