import { createService, destroyService, readService, readServiceAll, updateService } from "../../src/services/products.service.js";

import assert from "assert";
import dbConnect from "../../src/utils/dbConnect.util.js";

describe("🧪 Mocha - Product Service Tests", () => {
  let productId = "";

  before(async () => {
    console.log("🔥 Iniciando tests de servicios de productos...");
    await dbConnect();
  });

  it("✅ Debería crear un producto correctamente", async () => {
    const newProduct = {
      title: "Smartphone XYZ",
      description: "Un increíble smartphone con tecnología de punta.",
      price: 499.99,
      stock: 50,
      category: "celulares",
    };

    const product = await createService(newProduct);

    assert.ok(product, "❌ No se creó ningún producto");
    assert.strictEqual(product.title, "Smartphone XYZ");
    assert.ok(product._id);

    productId = product._id.toString();
  });

  it("✅ Debería leer un producto por ID", async () => {
    const product = await readService(productId);

    assert.ok(product, "❌ No se encontró ningún producto con ese ID");
    assert.strictEqual(product._id.toString(), productId);
  });

  it("✅ Debería obtener todos los productos", async () => {
    const products = await readServiceAll();

    assert.ok(Array.isArray(products), "❌ No se obtuvo una lista de productos");
    assert.ok(products.length > 0, "❌ La lista de productos está vacía");
  });

  it("✅ Debería actualizar el precio del producto", async () => {
    const updatedProduct = await updateService(productId, { price: 399.99 });

    assert.ok(updatedProduct, "❌ No se actualizó el producto");
    assert.strictEqual(updatedProduct.price, 399.99);
  });

  it("✅ Debería eliminar el producto correctamente", async () => {
    const deletedProduct = await destroyService(productId);

    assert.ok(deletedProduct, "❌ No se eliminó el producto");
    assert.strictEqual(deletedProduct._id.toString(), productId);
  });
});
