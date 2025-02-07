# 🔹 Usar una imagen oficial de Node.js ligera
FROM node:20-alpine

# 🔹 Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# 🔹 Copiar los archivos de configuración de dependencias
COPY package.json ./

# 🔹 Instalar solo dependencias necesarias para producción
RUN npm install

# 🔹 Copiar el resto del código de la aplicación
COPY . .

# 🔹 Exponer el puerto donde se ejecutará la app
EXPOSE 3035

# 🔹 Definir el entorno de ejecución por defecto como producción
ENV NODE_ENV=production

# 🔹 Comando de ejecución
CMD ["node", "index.js", "--env", "production"]
