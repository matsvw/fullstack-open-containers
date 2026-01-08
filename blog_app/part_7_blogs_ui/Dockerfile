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
RUN npm run lint
RUN npm run test

# --- Build stage ---
FROM node:24 AS build

WORKDIR /app

# Copy package files and reuse installed dependencies from the 'test' stage (faster, ensures tests ran)
COPY package.json package-lock.json ./
COPY --from=test /app/node_modules ./node_modules

# Copy source code (from test stage to include any test-generated fixtures)
COPY --from=test /app ./

# Build the Vite app
RUN npm run build

# --- Serve stage ---
FROM nginx

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]