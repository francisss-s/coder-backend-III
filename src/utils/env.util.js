import argsUtil from "./args.util.js";
import { config } from "dotenv";

// 📌 Obtener el entorno (por defecto "production")
const { env } = argsUtil;

// 📌 Si `MONGO_LINK` o `PORT` ya existen en `process.env`, asumimos que estamos en Docker
const isDocker = !!process.env.MONGO_LINK || !!process.env.PORT;

if (!isDocker) {
  const envFile = `.env.${env}`;
  config({ path: envFile });
}

// 📌 Exportar variables de entorno, usando primero las pasadas por Docker
const envUtil = {
  PORT: process.env.PORT || 3000,
  MONGO_LINK: process.env.MONGO_LINK || "",
  SECRET_KEY: process.env.SECRET_KEY || "default_secret",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
export default envUtil;
