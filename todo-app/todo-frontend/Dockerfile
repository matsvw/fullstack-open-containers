# --- Build stage ---
FROM node:24 AS build

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source (will copy .env as well)
COPY . . 

# Build the Vite app
RUN npm run build

# --- Serve stage ---
FROM nginx

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]