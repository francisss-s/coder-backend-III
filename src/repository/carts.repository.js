import CartDTO from "../dto/cart.dto.js";
import dao from "../dao/index.factory.js";

const { CartsManager } = dao;

class CartsRepository {
  createRepository = async (data) => {
    data = new CartDTO(data);
    return await CartsManager.create(data);
  };
  readRepository = async (user_id) => await CartsManager.readUserId(user_id);
  readOneRepository = async (id) => await CartsManager.readById(id);
  updateRepository = async (id, data) => await CartsManager.update(id, data);
  destroyRepository = async (id) => await CartsManager.destroy(id);
  readAllByUserRepository = async (user_id) => {
    return await CartsManager.read({ user_id, status: "active" });
  };
}

const repository = new CartsRepository();
const {
  createRepository,
  readRepository,
  readOneRepository,
  updateRepository,
  destroyRepository,
  readAllByUserRepository,  // ✅ Agregado
} = repository;
export {
  createRepository,
  readRepository,
  readOneRepository,
  updateRepository,
  destroyRepository,
  readAllByUserRepository,  // ✅ Agregado
};
