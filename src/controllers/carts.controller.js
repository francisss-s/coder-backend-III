import {
  createService,
  destroyService,
  purchase,
  readService,
  updateService
} from "../services/carts.service.js";

import {BAD_REQUEST} from "../utils/errors/dictionary.error.js";
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
      throw CustomError.create(BAD_REQUEST);
    }
    const message = "CARTS FOUND";
    const response = await readService({ user_id: new mongoose.Types.ObjectId(user_id) });
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
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      throw CustomError.create(BAD_REQUEST);
    }
    const message = "CART UPDATED";
    const response = await updateService(id, data);
    return res.status(200).json({ response, message });
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
    const purchaserEmail = req.user?.email || "no-email@example.com";
    const result = await purchase(cid, purchaserEmail);
    return res.status(200).json({ status: "success", result });
  } catch (error) {
    next(error);
  }
}

export { createCart, readCartsFromUser, updateCart, destroyCart, purchaseCart };
