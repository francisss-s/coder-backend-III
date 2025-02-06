import "dotenv/config.js"

import logger, { loggerMiddleware } from "./src/utils/logger.util.js";
import { swaggerSpec, swaggerUi } from "./src/utils/swagger.util.js";

import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import cors from "cors";
import dbConnect from "./src/utils/dbConnect.util.js"
import envUtil from "./src/utils/env.util.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import express from "express"
import indexRouter from "./src/routers/index.router.js"
import morgan from "morgan"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import session from "express-session"

// server

// 📌 Inicializar el servidor
const server = express();
const PORT = envUtil.PORT || 3000;





// middlewares
// 📌 Middlewares Globales
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(cors()); // Permitir CORS
server.use(morgan("dev")); // Logger HTTP
server.use(cookieParser(envUtil.SECRET_KEY)); // Manejo de cookies
server.use(loggerMiddleware); // Middleware personalizado para logs

// 📌 Configuración de Sesión
server.use(
    session({
      secret: envUtil.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongoUrl: envUtil.MONGO_LINK,
        ttl: 60 * 60 * 24, // 24 horas
      }),
      cookie: {
        secure: envUtil.NODE_ENV === "production", // Solo en HTTPS en producción
        httpOnly: true, // No accesible desde JS en el frontend
        sameSite: "strict", // Protección contra CSRF
        maxAge: 1000 * 60 * 60 * 24, // 1 día
      },
    })
  );


// 📌 Documentación con Swagger
server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 📌 Rutas de la API
server.use(indexRouter);

// 📌 Manejo de errores y rutas inexistentes
server.use(errorHandler);
server.use(pathHandler);

// 📌 Iniciar Servidor
const ready = ()=> {
    console.log("server ready on port "+PORT);
    dbConnect()
}
server.listen(PORT, () => {
  logger.info(`🚀 Servidor corriendo en ${envUtil.BASE_URL}`);
  ready();
});