#  Dockerfile for Node Express Backend

FROM node:16-alpine

WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","start"]