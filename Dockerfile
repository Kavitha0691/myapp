# ---------- Stage 1: Build the Next.js app ----------
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./
COPY tsconfig*.json ./
COPY next.config.* ./

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build

# ---------- Stage 2: Run the production app ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy required build artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.* ./

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
