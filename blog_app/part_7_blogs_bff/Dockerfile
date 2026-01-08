  # --- Test stage ---
FROM node:24 AS test

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source (will copy .env as well)
COPY . . 

# Run the linter and tests in CI mode (prevents watch mode)
ENV CI=true
ENV NODE_ENV=test 
RUN npm run lint
RUN npm run test

# --- Build stage ---
FROM node:24 AS build

WORKDIR /app

# Install rscyn as it is needed for the build
RUN apt-get update && apt-get install -y rsync

# Copy package files and reuse installed dependencies from the 'test' stage (faster, ensures tests ran)
COPY package.json package-lock.json ./
COPY --from=test /app/node_modules ./node_modules

# Copy source code (from test stage to include any test-generated fixtures)
COPY --from=test /app ./

# Build the backend
RUN npm run build

# --- Serve stage ---
FROM node:24

WORKDIR /app

ENV NODE_ENV=prod

# Copy package files
COPY package.json package-lock.json ./

# Install only production deps
RUN npm ci --omit=dev

# Copy built assets
COPY --from=build /app/dist ./dist

USER node

CMD ["node", "dist/index.js"]

