# Use Node 20 as base
FROM node:20-slim AS base

# Install build dependencies
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
FROM base AS deps
RUN pnpm install --frozen-lockfile

# Build application
FROM deps AS builder
COPY . .
RUN pnpm run build

# Production Runner
FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.ts ./server.ts

# Set environment
ENV NODE_ENV=production
EXPOSE 3000

# Start the server using tsx (since we're using a single file for simplicity in this demo)
CMD ["npx", "tsx", "server.ts"]
