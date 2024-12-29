import {
  createService,
  destroyService,
  purchase,
  readService,
  updateService
} from "../services/carts.service.js";

import mongoose from "mongoose";

async function createCart(req, res) {
  const message = "CART CREATED";
  const data = req.body;
  const response = await createService(data);
  return res.status(201).json({ response, message });
}

async function readCartsFromUser(req, res) {
  const { user_id } = req.params;

  // Validar si el `user_id` es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ message: "Invalid user_id format" });
  }

  try {
    const message = "CARTS FOUND";
    // Enviar el filtro correcto
    const response = await readService({ user_id: new mongoose.Types.ObjectId(user_id) });
    return res.status(200).json({ response, message });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateCart(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "CART UPDATED";
  const response = await updateService(id, data);
  return res.status(200).json({ response, message });
}

async function destroyCart(req, res) {
  const { id } = req.params;
  const message = "CART DELETED";
  // AHORA sí llamamos al service
  const response = await destroyService(id);
  return res.status(200).json({ response, message });
}

async function purchaseCart(req, res) {
  try {
    const { cid } = req.params;     // interpretamos cid como user_id
    const purchaserEmail = req.user?.email || "no-email@example.com"; 
      // asumiendo que tu middleware de auth pone user en req.user
    const result = await purchase(cid, purchaserEmail);
    return res.status(200).json({ status: "success", result });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}
export { createCart, readCartsFromUser, updateCart, destroyCart, purchaseCart};
