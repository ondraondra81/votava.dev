# Build stage
FROM registry.votava.dev/votavadev/base:latest AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Generate Prisma client and build the application
RUN pnpm prisma generate && pnpm build

# Final stage
FROM registry.votava.dev/votavadev/base:latest

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copy entrypoint script
COPY docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Set environment variables
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Use entrypoint script to run migrations before starting the app
CMD ["./entrypoint.sh"]