# docker/production/Dockerfile
FROM node:22-alpine AS builder

# Instalace PNPM
RUN npm install -g pnpm

WORKDIR /app

# Kopírování package.json a pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Instalace závislostí
RUN pnpm install --frozen-lockfile

# Kopírování zbytku aplikace
COPY . .

# Build aplikace
RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Kopírování potřebných souborů z builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]