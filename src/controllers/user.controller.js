import {
    createService,
    destroyService,
    forgotService,
    readService,
    resetPasswordService,
    updateService,
    verifyService
} from "../services/user.service.js";

async function createUser(req, res) {
    const message = "USER CREATED";
    const data = req.body;
    const response = await createService(data);
    return res.status(201).json({ response, message });
  }
  async function readUsers(req, res) {
    const message = "USERS FOUND";
    const response = await readService();
    return res.status(200).json({ response, message });
  }
  async function updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "USER UPDATED";
    const response = await updateService(id, data);
    return res.status(200).json({ response, message });
  }
  async function destroyUser(req, res) {
    const { id } = req.params;
    const message = "USER DELETED";
    const response = await destroyService(id);
    return res.status(200).json({ response, message });
  }
  
  async function verifyAccount(req, res) {
    try {
      const { code } = req.query;
      if (!code) {
        return res.status(400).json({ error: "Missing verification code" });
      }
  
      // llama al service
      const user = await verifyService(code);
      if (!user) {
        return res.status(404).json({ error: "Invalid code or user not found" });
      }
      return res.json({ message: "User verified!", user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  async function forgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
  
      // Llamar al service
      const { user, token } = await forgotService(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // (Opcional) Enviar correo real con el token/link
      // o retornar el token en la respuesta
      return res.status(200).json({
        message: "Reset token generated",
        token,
        user: {
          email: user.email
        }
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async function resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body; 
      if (!token || !newPassword) {
        return res.status(400).json({ error: "Missing token or newPassword" });
      }
      const user = await resetPasswordService(token, newPassword);
      if (!user) {
        return res.status(404).json({ error: "Invalid token or user not found" });
      }
      return res.status(200).json({ message: "Password updated successfully", user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  export { createUser, readUsers, updateUser, destroyUser,verifyAccount,forgotPassword,resetPassword};