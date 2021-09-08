# For local development
FROM node:latest
WORKDIR /app

COPY package.json ./
RUN mkdir backend
COPY backend/package.json backend/package.json

RUN yarn workspace backend install
COPY . .


CMD ["yarn", "be:start"]