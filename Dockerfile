FROM node:22-alpine

WORKDIR /app

# Instalar dependencias primero para aprovechar la cache de capas
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

EXPOSE 5173

# Servidor de desarrollo de Vite accesible desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
