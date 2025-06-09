# Etapa base (dependencias comunes)
FROM node:18-alpine as base

RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app

COPY package*.json ./

EXPOSE 3000

# Etapa builder (build de la app)
FROM base as builder

WORKDIR /app

COPY . .

# Instalar dependencias (sin dependencias de desarrollo se puede usar --only=production pero acá usamos full para el build)
RUN npm ci

# Build de la app
RUN npm run build

# Etapa de producción
FROM base as production

WORKDIR /app

ENV NODE_ENV=production

# Copiamos solo lo necesario para producción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Configuramos el user seguro
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Comando de inicio en producción
CMD npm start

# Etapa de desarrollo (opcional)
FROM base as dev

WORKDIR /app

ENV NODE_ENV=development

RUN npm install

COPY . .

CMD npm run dev
