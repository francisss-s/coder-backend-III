import { Router } from "express";
import sessionsApiRouter from "./sessions.api.js";
import usersApiRouter from "./users.api.js";

const apiRouter = Router();

// Rutas de la API
apiRouter.use("/users", usersApiRouter);
apiRouter.use("/sessions", sessionsApiRouter);


export default apiRouter;
