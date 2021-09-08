# For local development
FROM node:latest
WORKDIR /app

COPY package.json ./
RUN mkdir frontend
COPY frontend/package.json frontend/package.json

RUN yarn workspace frontend install
COPY . .


CMD ["yarn", "fe:start"]