FROM node:22-alpine

# Instalace PNPM
RUN npm install -g pnpm

# Instalace závislostí pro Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

WORKDIR /app

# Kopírování jen souborů potřebných pro instalaci
COPY package.json pnpm-lock.yaml* ./

# Instalace závislostí s příznakem --frozen-lockfile pro zajištění konzistence
RUN pnpm install --frozen-lockfile

# Nastavení proměnných pro Next.js development server
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

EXPOSE 3000

# Použití -p zajistí, že se změny projeví okamžitě
CMD ["sh", "-c", "pnpm prisma generate && pnpm dev --turbo"]