import envUtil from "./env.util.js";
import winston from "winston";

// Definir niveles de log y colores
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
    debug: "green",
  },
};

winston.addColors(customLevels.colors);

// Configurar Winston Logger
const logger = winston.createLogger({
  level: envUtil.LOG_LEVEL || "info",
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "logs/all.log", level: "debug" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// Middleware para registrar cada request y response
export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    req.logger = logger;
    req.logger.http(
      `📡 ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

export default logger;
