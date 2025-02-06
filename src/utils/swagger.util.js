import { fileURLToPath } from "url";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Mocking, Carritos y Usuarios",
      version: "1.0.0",
      description: "Documentación de la API para manejar usuarios, productos y carritos con MongoDB.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: "Servidor local",
      },
    ],
  },
  apis: [path.join(__dirname, "../routers/api/*.js")], // Buscar documentación en todas las rutas API
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
