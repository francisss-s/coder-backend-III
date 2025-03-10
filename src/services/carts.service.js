import { bulkUpdateRepository, readOneProduct } from "../repository/products.repository.js"; // ✅ Importado correctamente
import {
  createRepository,
  destroyRepository,
  readAllByUserRepository,
  readOneRepository,
  readRepository,
  updateRepository
} from "../repository/carts.repository.js";

import { createTicket } from "../repository/ticket.repository.js";
import { v4 as uuidv4 } from "uuid";

class CartsService {
  createService = async (data) => await createRepository(data);
  readService = async (id) => await readOneRepository(id); // ✅ Corregido para leer por ID
  updateService = async (id, data) => await updateRepository(id, data);
  destroyService = async (id) => await destroyRepository(id);
  readAllByUser = async (user_id) => await readAllByUserRepository(user_id); // ✅ Se asegura de que sea llamado correctamente

  async purchase(cart_id, purchaserEmail) {
    const cart = await readOneRepository(cart_id);
    if (!cart || cart.products.length === 0) {
      throw new Error("❌ Cart is empty");
    }
    let total = 0;
    const productsNotPurchased = [];
    const bulkOperations = [];
  
    for (const item of cart.products) {
      const product = await readOneProduct(item.product_id);
  
      if (!product || product.stock < item.quantity) {
        productsNotPurchased.push(item.product_id);
        continue;
      }
  
      bulkOperations.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $inc: { stock: -item.quantity } },
        },
      });
  
      total += product.price * item.quantity;
    }
  
    if (bulkOperations.length > 0) {
      await bulkUpdateRepository(bulkOperations); // ✅ Ahora usa la función correcta
    }
  
    let ticket = null;
    if (total > 0) {
      ticket = await createTicket({
        code: uuidv4().substring(0, 8),
        amount: total,
        purchaser: purchaserEmail,
      });
    }
  
    cart.products = cart.products.filter(
      (item) => !productsNotPurchased.includes(item.product_id)
    );
    await updateRepository(cart_id, { products: cart.products });
  
    return { ticket, notPurchased: productsNotPurchased };
  }
}

const service = new CartsService();
const { createService, readService, updateService, destroyService, purchase, readAllByUser } =
  service;
export { createService, readService, updateService, destroyService, purchase, readAllByUser };
