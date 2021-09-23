FROM node:16-alpine as builder
ARG REACT_APP_MAPBOX_TOKEN
ARG MESSAGING_VAPID_KEY
ENV REACT_APP_MAPBOX_TOKEN ${REACT_APP_MAPBOX_TOKEN}
ENV MESSAGING_VAPID_KEY ${MESSAGING_VAPID_KEY}
RUN mkdir frontend backend api
COPY package.json yarn.lock* ./
COPY frontend/package.json frontend/yarn.lock* frontend/
COPY backend/package.json backend/yarn.lock* backend/
COPY api/package.json api/package.json
RUN apk add python3 
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN yarn
COPY . .
RUN yarn workspace frontend build
RUN yarn workspace backend build
RUN mv frontend/build backend/dist/

FROM node:16-alpine
COPY --from=builder backend/dist ./
COPY backend/package.json .
COPY yarn.lock .
RUN yarn --prod
CMD ["node", "backend/src/main"]