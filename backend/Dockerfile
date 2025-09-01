# FROM node:20-slim

# WORKDIR .

# COPY package*.json ./

# RUN apt-get update && apt-get install -y --no-install-recommends \
#   build-essential \
#   node-gyp \
#   python3 \
#   pkg-config \
#   && rm -rf /var/lib/apt/lists/*

# RUN npm install

# COPY . .

# EXPOSE 8080

# CMD ["npm", "run", "prod"]



FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM deps AS build
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

USER node

COPY --chown=node:node package*.json ./
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
RUN npm prune --omit=dev

COPY --from=build --chown=node:node /app/dist ./dist

EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist/server.js"]
