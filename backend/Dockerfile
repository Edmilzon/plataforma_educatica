# --- Stage 1: Build (Etapa de Construcción) ---
# Usa una imagen de Node para instalar dependencias y compilar
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de configuración
COPY package*.json ./

# Instala todas las dependencias (incluyendo las de desarrollo para la compilación)
RUN npm install

# Copia el resto del código
COPY . .

# Compila la aplicación NestJS
RUN npm run build


# --- Stage 2: Production (Etapa de Producción/Ejecución) ---
# Usa una imagen más pequeña de Node para la ejecución
FROM node:20-alpine AS production

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios de la etapa 'builder'
# 1. Copia la carpeta 'dist' (los archivos compilados)
COPY --from=builder /app/dist ./dist

# 2. Copia los archivos necesarios para la ejecución de producción
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Puerto interno del contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "node", "dist/main" ]