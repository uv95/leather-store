FROM node:20-slim

WORKDIR .

COPY package*.json ./

RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  node-gyp \
  python3 \
  pkg-config \
  && rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "server"]
