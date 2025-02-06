import {BAD_REQUEST, NOT_FOUND} from "../utils/errors/dictionary.error.js";
import {
  createService,
  destroyService,
  forgotService,
  readService,
  resetPasswordService,
  updateService,
  verifyService
} from "../services/user.service.js";

import CustomError from "../utils/errors/custom.error.js";

async function createUser(req, res, next) {
  try {
      if (!req.body || Object.keys(req.body).length === 0) {
          throw CustomError.create(errors.BAD_REQUEST);
      }
      const message = "USER CREATED";
      const data = req.body;
      const response = await createService(data);
      return res.status(201).json({ response, message });
  } catch (error) {
      next(error);
  }
}

async function readUsers(req, res, next) {
  try {
      const message = "USERS FOUND";
      const response = await readService();
      return res.status(200).json({ response, message });
  } catch (error) {
      next(error);
  }
}

async function updateUser(req, res, next) {
  try {
      const { id } = req.params;
      if (!id) throw CustomError.create(errors.BAD_REQUEST);
      
      const data = req.body;
      if (!data || Object.keys(data).length === 0) {
          throw CustomError.create(errors.BAD_REQUEST);
      }

      const message = "USER UPDATED";
      const response = await updateService(id, data);
      return res.status(200).json({ response, message });
  } catch (error) {
      next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
      const { id } = req.params;
      if (!id) throw CustomError.create(errors.BAD_REQUEST);

      const message = "USER DELETED";
      const response = await destroyService(id);
      return res.status(200).json({ response, message });
  } catch (error) {
      next(error);
  }
}

async function verifyAccount(req, res, next) {
  try {
      const { code } = req.query;
      if (!code) throw CustomError.create(errors.BAD_REQUEST);
      
      const user = await verifyService(code);
      if (!user) throw CustomError.create(errors.NOT_FOUND);
      
      return res.status(200).json({ message: "User verified!", user });
  } catch (error) {
      next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
      const { email } = req.body;
      if (!email) throw CustomError.create(errors.BAD_REQUEST);

      const { user, token } = await forgotService(email);
      if (!user) throw CustomError.create(errors.NOT_FOUND);

      return res.status(200).json({
          message: "Reset token generated",
          token,
          user: { email: user.email }
      });
  } catch (error) {
      next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) throw CustomError.create(errors.BAD_REQUEST);
      
      const user = await resetPasswordService(token, newPassword);
      if (!user) throw CustomError.create(errors.NOT_FOUND);
      
      return res.status(200).json({ message: "Password updated successfully", user });
  } catch (error) {
      next(error);
  }
}

export { createUser, readUsers, updateUser, destroyUser, verifyAccount, forgotPassword, resetPassword };
