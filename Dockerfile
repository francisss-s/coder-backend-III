# Usar una imagen oficial de Node.js
FROM node:22

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Definir la variable de entorno para producción
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
