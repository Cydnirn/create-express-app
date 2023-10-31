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
WORKDIR /app
COPY --chown=node:node --from=build /app/dist .
COPY --chown=node:node package*.json .
RUN npm ci 
COPY --chown=node:node . .
USER node
CMD [ "npm", "install" ]
