import {
  createService,
  destroyService,
  purchase,
  readService,
  updateService
} from "../services/carts.service.js";

import { BAD_REQUEST } from "../utils/errors/dictionary.error.js";
import CustomError from "../utils/errors/custom.error.js";
import mongoose from "mongoose";

async function createCart(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw CustomError.create(BAD_REQUEST);
    }
    const message = "CART CREATED";
    const data = req.body;
    const response = await createService(data);
    return res.status(201).json({ response, message });
  } catch (error) {
    next(error);
  }
}

async function readCartsFromUser(req, res, next) {
  try {
    const { user_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      throw CustomError.create(BAD_REQUEST, "Invalid User ID");
    }

    const message = "CARTS FOUND";
    const response = await readAllByUser(user_id);

    if (!response || response.length === 0) {
      throw CustomError.create(NOT_FOUND, "No carts found for this user.");
    }

    return res.status(200).json({ response, message });
  } catch (error) {
    next(error);
  }
}

async function updateCart(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw CustomError.create(BAD_REQUEST);
    }

    const { product_id, quantity } = req.body;
    if (!product_id || !quantity || quantity <= 0) {
      throw CustomError.create(BAD_REQUEST, "Invalid product data");
    }

    const cart = await readService(id);
    if (!cart) {
      throw CustomError.create(NOT_FOUND);
    }

    const productExists = await readProductRepository(product_id);
    if (!productExists) {
      throw CustomError.create(NOT_FOUND, "Product does not exist");
    }

    // Buscar si el producto ya está en el carrito
    const productIndex = cart.products.findIndex((p) =>
      p.product_id.equals(product_id)
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ product_id, quantity });
    }

    const updatedCart = await updateService(id, { products: cart.products });

    return res.status(200).json({ message: "CART UPDATED", updatedCart });
  } catch (error) {
    next(error);
  }
}


async function destroyCart(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw CustomError.create(BAD_REQUEST);
    }
    const message = "CART DELETED";
    const response = await destroyService(id);
    return res.status(200).json({ response, message });
  } catch (error) {
    next(error);
  }
}

async function purchaseCart(req, res, next) {
  try {
    const { cid } = req.params;
    if (!cid || !mongoose.Types.ObjectId.isValid(cid)) {
      throw CustomError.create(BAD_REQUEST);
    }

    const cart = await readService(cid);
    
    if (!cart || cart.products.length === 0) {
      throw CustomError.create(NOT_FOUND, "Cart is empty");
    }

    const purchaserEmail = req.user?.email || "no-email@example.com";
    const result = await purchase(cid, purchaserEmail);

    if (result.notPurchased.length === cart.products.length) {
      return res.status(400).json({
        status: "failed",
        message: "No products were purchased due to insufficient stock",
        result,
      });
    }

    if (result.notPurchased.length > 0) {
      return res.status(200).json({
        status: "partial_purchase",
        message: "Some products were out of stock",
        result,
      });
    }

    return res.status(200).json({ status: "success", result });
  } catch (error) {
    next(error);
  }
}

export { createCart, readCartsFromUser, updateCart, destroyCart, purchaseCart };
