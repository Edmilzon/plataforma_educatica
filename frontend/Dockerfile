# --- Stage 1: Dependencies (Instalar Dependencias) ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production=false

# --- Stage 2: Builder (Compilación) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construir la aplicación Next.js para producción
RUN npm run build


# --- Stage 3: Runner (Ejecución de Producción) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Configura Next.js para correr con un usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copia solo los archivos esenciales para correr la app Next.js standalone
COPY --from=builder /app/public ./public
# Copia la carpeta standalone generada por la build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static /.next/static

# Puerto interno del contenedor (diferente del backend)
EXPOSE 3001

# Comando de inicio para la aplicación Next.js
CMD ["node", "server.js"]