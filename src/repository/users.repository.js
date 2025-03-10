import UserDTO from "../dto/user.dto.js"
import dao from "../dao/index.factory.js"

const { UsersManager } = dao

class UsersRepository {
  createRepository = async (data) => {
    
    data = new UserDTO(data)
    return await UsersManager.create(data);
  }
  readRepository = async (user_id) => await UsersManager.readOne({ _id: user_id });
  updateRepository = async (id, data) => await UsersManager.update(id, data);
  destroyRepository = async (id) => await UsersManager.destroy(id);
  verifyRepository = async (code) => {
    // 1. Buscar el user por verifyCode
    const user = await UsersManager.readOne({ verifyCode: code });
    if (!user) return null;
  
    // 2. Actualizar
    await UsersManager.update(user._id, {
      verifyUser: true,
      verifyCode: ""
    });
  
    // Retornar el user ya actualizado (re-leyéndolo o devolviendo un objeto)
    return { ...user, verifyUser: true, verifyCode: "" };
  };

  async userForgotRepository(email, token) {
    // Buscar user por email
    const user = await UsersManager.readByEmail(email);
    if (!user) return { user: null, token: null };

    // Actualizar su resetToken y opcional un resetTokenExpires
    await UsersManager.update(user._id, {
      resetToken: token,
      resetTokenExpires: new Date(Date.now() + 3600000), // +1h de validez
    });
    return { user, token };
  }
  
  async resetPasswordRepository(token, hashedPassword) {
    // 1. Buscar user con ese resetToken
    const user = await UsersManager.readOne({ resetToken: token });
    if (!user) return null;

    // (Opcional) Verificar si resetTokenExpires > Date.now()

    // 2. Actualizar password y limpiar resetToken
    await UsersManager.update(user._id, {
      password: hashedPassword,
      resetToken: "",
      resetTokenExpires: null
    });
    return { ...user, password: hashedPassword, resetToken: "", resetTokenExpires: null };
  }
}

const repository = new UsersRepository();
const { createRepository, readRepository, updateRepository, destroyRepository,verifyRepository, userForgotRepository,resetPasswordRepository } = repository;
export { createRepository, readRepository, updateRepository, destroyRepository,verifyRepository, userForgotRepository, resetPasswordRepository };