import argsUtil from "./args.util.js";
import { config } from "dotenv";

// Obtener el entorno (por defecto "prod")
const { env } = argsUtil;

// Cargar el archivo .env correcto
const envFile = `.env.${env}`;
config({ path: envFile });

console.log(`🛠 Cargando configuración desde ${envFile}`);

// Exportar variables de entorno
const envUtil = {
  PORT: process.env.PORT || 3000,
  MONGO_LINK: process.env.MONGO_LINK || "",
  SECRET_KEY: process.env.SECRET_KEY || "default_secret",
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export default envUtil;
