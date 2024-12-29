import usersManager from "../dao/mongo/managers/users.manager.js";

async function isValidUser(req, res, next) {
  const { email, password } = req.body;
  const one = await usersManager.readByEmail(email);
  if (one) {
    return next();
  }
  const error = new Error("INVALID CREDENTIALS");
  error.statusCode = 401;
  throw error;
}

export default isValidUser;