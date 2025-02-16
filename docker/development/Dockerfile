FROM node:22-alpine

# Instalace PNPM
RUN npm install -g pnpm

WORKDIR /app

# Kopírování jen souborů potřebných pro instalaci
COPY package.json pnpm-lock.yaml* ./

# Instalace závislostí s příznakem --frozen-lockfile pro zajištění konzistence
RUN pnpm install --frozen-lockfile

# Nastavení proměnných pro Next.js development server
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

EXPOSE 3000

# Použití -p zajistí, že se změny projeví okamžitě
CMD ["pnpm", "dev", "-p", "3000"]