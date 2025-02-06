import envUtil from "./env.util.js";
import logger from "./logger.util.js";
import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(envUtil.MONGO_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("✅ Conexión a MongoDB establecida correctamente.");
  } catch (error) {
    logger.error("❌ Error al conectar con MongoDB:", error);
    process.exit(1); // Detener la aplicación si no puede conectarse a la BD
  }
}

export default dbConnect;
