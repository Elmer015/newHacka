FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# don't block startup waiting on a hardcoded host name; configuration will
# be provided via environment variables (Railway gives DATABASE_URL etc).
CMD ["node", "server.js"]