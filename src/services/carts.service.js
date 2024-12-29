import { createRepository, destroyRepository, readRepository, updateRepository } from "../repository/carts.repository.js";

class CartsService {
  createService = async (data) => await createRepository(data);
  readService = async (user_id) => await readRepository(user_id);
  updateService = async (id, data) => await updateRepository(id, data);
  destroyService = async (id) => await destroyRepository(id);
  async purchase(user_id, purchaserEmail) {
    console.log("user_id", user_id);
    console.log("purchaserEmail", purchaserEmail);
    // 1. Obtener TODOS los docs de cart para user
    const cartItems = await readRepository({"user_id": user_id});
    console.log("cartItems", cartItems);
    if (!cartItems || cartItems.length === 0) {
      throw new Error("No hay productos en el carrito");
    }

    let total = 0;
    const productsNotPurchased = [];

    // 2. Verificar stock de cada item
    for (const item of cartItems) {
      // Buscar el product en DB
      const product = await ProductsRepository.readById(item.product_id); 
      if (!product) {
        productsNotPurchased.push(item.product_id);
        continue;
      }
      // Chequeamos stock
      if (product.stock >= item.quantity) {
        // Descontar stock
        const newStock = product.stock - item.quantity;
        await ProductsRepository.updateRepository(product._id, { stock: newStock });
        // Sumar al total
        total += product.price * item.quantity;
      } else {
        // no hay suficiente stock
        productsNotPurchased.push(item.product_id);
      }
    }

    // 3. Crear el ticket si total > 0
    let ticket = null;
    if (total > 0) {
      ticket = await TicketsRepository.createTicket({
        code: uuidv4().substring(0,8),
        amount: total,
        purchaser: purchaserEmail, // Ej: user.email
      });
    }

    // 4. Filtramos los items que SÍ se compraron (los que no están en productsNotPurchased)
    //   y BORRAMOS esos docs de la colección 'carts' (o actualizamos state a 'paid', depende de tu lógica)
    const purchasedItems = cartItems.filter(
      item => !productsNotPurchased.includes(item.product_id)
    );

    // Borramos los purchased
    for (const item of purchasedItems) {
      // Podrías destroy cada doc con item._id
      await destroyRepository(item._id);
    }

    // 5. Al final, devolvemos info
    return {
      ticket,
      notPurchased: productsNotPurchased
    };
  }
}

const service = new CartsService();
const { createService, readService, updateService, destroyService,purchase } = service;
export { createService, readService, updateService, destroyService,purchase };