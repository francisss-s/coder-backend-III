import { createRepository, destroyRepository, readRepository, resetPasswordRepository, updateRepository, userForgotRepository, verifyRepository } from "../repository/users.repository.js";

import { createHashUtil } from "../utils/hash.util.js";
import { v4 as uuidv4 } from "uuid";

class UsersService {
  createService = async (data) => await createRepository(data);
  readService = async (user_id) => await readRepository(user_id);
  updateService = async (id, data) => await updateRepository(id, data);
  destroyService = async (id) => await destroyRepository(id);
  verifyService = async (data) => await verifyRepository(data);
  async forgotService(email) {
    // 1. Generar token
    const token = uuidv4().split("-")[0]; // "a1b2c3d4" (ejemplo)
    // 2. Llamar al repository
    const { user, token: assignedToken } = await userForgotRepository(email, token);

    // assignedToken es el mismo token que guardaste en la DB
    return { user, token: assignedToken };
  }
  async resetPasswordService(token, newPassword) {
    // Hashear la newPassword
    const hashed = createHashUtil(newPassword);
    const user = await resetPasswordRepository(token, hashed);
    return user;
  }
}

const service = new UsersService();
const { createService, readService, updateService, destroyService, verifyService, forgotService, resetPasswordService } = service;
export { createService, readService, updateService, destroyService, verifyService, forgotService, resetPasswordService }