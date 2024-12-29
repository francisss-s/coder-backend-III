import usersManager from "../dao/mongo/managers/users.manager";

async function isUser(req, res, next) {
  const { email } = req.body;
  const one = await usersManager.readByEmail(email);
  if (one) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }
  return next();
}

export default isUser;