#Build stage
FROM node:18 AS build
RUN apt-get update && apt-get upgrade -y
WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY . .
RUN npm run build && rm -rf node_modules

#Production stage
FROM node:18-bookworm-slim
ENV NODE_ENV production
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/package*.json .
RUN npm ci 
CMD [ "npm", "start" ]
