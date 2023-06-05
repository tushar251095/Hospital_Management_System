# Dockerfile for React client

# Build react client
FROM node:16

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install 

# copy local files to app folder
COPY . .

EXPOSE 8080

CMD ["npm","start"]