# 🛒 Backend de Tienda Online con Node.js y MongoDB

## 📌 Descripción
Este proyecto es un backend desarrollado en Node.js utilizando Express.js y MongoDB como base de datos. Implementa una API RESTful para la gestión de usuarios, productos, carritos de compras y procesos de autenticación. También incluye generación de datos ficticios (mocking), manejo de errores, seguridad con JWT, y documentación con Swagger.

## 🚀 Tecnologías Utilizadas
- Node.js (v20+)  
- Express.js - Framework para backend  
- MongoDB - Base de datos NoSQL  
- Mongoose - ODM para MongoDB  
- JWT (Json Web Token) - Autenticación  
- Bcrypt - Hashing de contraseñas  
- Passport.js - Middleware de autenticación  
- Swagger - Documentación de API  
- Winston - Logger para control de errores y eventos  
- dotenv - Configuración de variables de entorno  
- Faker.js - Generación de datos de prueba (mocking)  

## 📂 Estructura del Proyecto

```
src/
    │── controllers/        # Controladores para manejar las peticiones
    │── dao/                    # Data Access Object (Manejo de MongoDB)
    │── dto/                    # Data Transfer Objects (Estructura de datos)
    │── middlewares/     # Middlewares de autenticación y validación
    │── repository/         # Lógica de abstracción de datos
    │── routers/              # Definición de rutas de la API
    │── services/            # Lógica de negocio
    │── utils/                  # Utilidades (logger, configuración, Swagger)
    │── tests/                 # Pruebas unitarias (Jest & Supertest)
    │── index.js              # Archivo principal de la aplicación
    │── .env                  # Variables de entorno
    │── package.json         # Dependencias y configuración del proyecto
```

## 📜 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```
git clone https://github.com/tu_usuario/tu_proyecto.git
cd tu_proyecto
```

### 2️⃣ Instalar dependencias

```
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo .env.production en la raíz del proyecto y define las siguientes variables:
```
PORT=3035
NODE_ENV=production

# MongoDB
MONGO_LINK=tu_mongo_link

# JWT
SECRET_KEY=tu_secreto_jwt

# logger
LOG_LEVEL=debug

```
### 4️⃣ Iniciar el servidor

🔹 Modo desarrollo
```
npm run dev
```
🔹 Modo producción
```
npm start
```

### Tambien se puede utilizar la imagen de docker

#### Para  obtener la imagen
``` sh
docker push franzisz/coder3:tagname
```

#### Para ejecutar el contenedor puedes hacer
``` sh
npm docker:run
```
Debes generar un archivo .env.production para poder ejecutarlo con las variables de entonrno que se mencionaron en el punto 3️⃣

#### Para detener el contendor puedes hacer lo siguente 

``` sh
npm docker:stop
```

## 📌 Rutas de la API

📄 La documentación completa de la API está disponible en Swagger.

👉 Accede a la documentación en:
http://localhost:`${port}`/api/docs

### 🔹 Autenticación


| Método | Endpoint             | Descripción                          |
|--------|----------------------|--------------------------------------|
POST|/users/register|Registra un nuevo usuario
POST|/users/login	|Inicia sesión de usuario
POST|/users/signout	|Cierra sesión de usuario
POST|/users/current	|Verifica sesión activa
GET	|/users/verify	|Verifica cuenta de usuario
POST|/users/forgot	|Solicita restablecimiento de contraseña
PUT	|/users/reset	|Restablece contraseña

### 🔹 Usuarios

| Método | Endpoint             | Descripción                          |
|--------|----------------------|--------------------------------------|
GET	|/users	|Obtiene todos los usuarios
PUT	|/users/:id	|Actualiza un usuario
DELETE	|/users/:id	|Elimina un usuario

### 🔹 Productos

| Método | Endpoint             | Descripción                          |
|--------|----------------------|--------------------------------------|
GET	|/products	|Obtiene todos los productos
POST	|/products	|Crea un nuevo producto
PUT	|/products/:id	|Actualiza un producto
DELETE	|/products/:id	|Elimina un producto

### 🔹 Carritos

| Método | Endpoint             | Descripción                          |
|--------|----------------------|--------------------------------------|
POST	|/carts	|Crea un nuevo carrito
GET	|/carts/:user_id	|Obtiene los carritos de un usuario
PUT	|/carts/:id	|Modifica un carrito
DELETE	|/carts/:id	|Elimina un carrito
POST	|/carts/:cid/purchase	|Realiza una compra

### 🔹 Mocking

| Método | Endpoint             | Descripción                          |
|--------|----------------------|--------------------------------------|
GET	|/mocks/mockingusers	|Genera usuarios de prueba
POST	|/mocks/:users/:products	|Crea usuarios y productos de prueba


## 🔐 Seguridad
🔹 Autenticación con JWT: Todas las rutas protegidas requieren un token JWT.  
🔹 Middleware de permisos: Se verifica si el usuario tiene permisos de ADMIN o USER.  
🔹 Protección de contraseñas: Se utiliza bcrypt para encriptar contraseñas.

## 📊 Logs y Monitoreo
- Se utiliza Winston para manejar logs de info, warn y error.
- En producción, los errores se guardan en logs/error.log.
