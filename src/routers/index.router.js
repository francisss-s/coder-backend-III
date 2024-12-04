import { Router } from "express";
import apiRouter from "./api/index.api.js";

const indexRouter = Router();

// Enlazamos el router de la API
indexRouter.use("/api", apiRouter);

export default indexRouter;
