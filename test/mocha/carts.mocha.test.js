import {
    createService,
    destroyService,
    purchase,
    readAllByUser,
    readService,
    updateService
} from "../../src/services/carts.service.js";

import assert from "assert";
import { createService as createProductService } from "../../src/services/products.service.js";
import { createService as createUserService } from "../../src/services/user.service.js";
import dbConnect from "../../src/utils/dbConnect.util.js";

describe("🛒 Mocha - Cart Service Tests", () => {
      let userId = "";
      let cartId = "";
      let productId = "";
  
      before(async () => {
          console.log("🔥 Iniciando tests de carrito...");
          await dbConnect();
  
          // Crear usuario de prueba
          const user = await createUserService({
              first_name: "Test",
              last_name: "User",
              email: `test${Date.now()}@email.com`,  // ✅ Corrección de comillas
              age: 30,
              password: "password123",
              role: "USER",
          });
          userId = user._id.toString();
  
          // Crear producto de prueba
          const product = await createProductService({
              title: "Producto Test",
              description: "Descripción de prueba",
              price: 100,
              stock: 5,
              category: "computadoras",
          });
          productId = product._id.toString();
      });
  
      it("✅ Debería crear un carrito correctamente", async () => {
          const newCart = {
              user_id: userId,
              products: [],
              status: "active",
          };
  
          const cart = await createService(newCart);
          assert.strictEqual(typeof cart, "object");
          assert.strictEqual(cart.user_id.toString(), userId);
          cartId = cart._id.toString();
      });
  
      it("✅ Debería leer un carrito por ID", async () => {
          const cart = await readService(cartId);
          assert.ok(cart);
          assert.strictEqual(cart._id.toString(), cartId);
      });
  
      it("✅ Debería leer todos los carritos de un usuario", async () => {
          const carts = await readAllByUser(userId);
          assert.ok(carts);
          assert.strictEqual(Array.isArray(carts), true);
          assert.ok(carts.length > 0);
      });
  
      it("✅ Debería agregar un producto al carrito", async () => {
          const updatedCart = await updateService(cartId, {
              products: [{ product_id: productId, quantity: 2 }],
          });
  
          assert.ok(updatedCart);
          assert.strictEqual(updatedCart.products.length, 1);
          assert.strictEqual(updatedCart.products[0].product_id.toString(), productId);
          assert.strictEqual(updatedCart.products[0].quantity, 2);
      });
  
      it("✅ Debería simular la compra del carrito", async () => {
          const purchaseResult = await purchase(cartId, "test-user@email.com");
  
          assert.ok(purchaseResult);
          assert.ok(purchaseResult.ticket);
          assert.strictEqual(typeof purchaseResult.ticket.code, "string");
      });
  
      it("✅ Debería eliminar el carrito correctamente", async () => {
          const deleteResult = await destroyService(cartId);
          assert.ok(deleteResult);
      });
  
      after(async () => {
          console.log("🧹 Limpiando datos de prueba...");
          await destroyService(cartId);
      });
  });
  