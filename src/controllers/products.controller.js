import {BAD_REQUEST, NOT_FOUND} from "../utils/errors/dictionary.error.js";
import {
  createService,
  destroyService,
  readService,
  updateService,
} from "../services/products.service.js";

import CustomError from "../utils/errors/custom.error.js";

async function createProduct(req, res, next) {
  try {
      if (!req.body || Object.keys(req.body).length === 0) {
          throw CustomError.create(BAD_REQUEST);
      }
      const message = "PRODUCT CREATED";
      const data = req.body;
      const response = await createService(data);
      return res.status(201).json({ message, data: response });
  } catch (error) {
      next(error);
  }
}

async function readProducts(req, res, next) {
  try {
      const message = "PRODUCTS FOUND";
      const response = await readService();
      if (response.length > 0) {
          return res.status(200).json({ message, data: response });
      }
      throw CustomError.create(NOT_FOUND);
  } catch (error) {
      next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
      const { id } = req.params;
      if (!id) throw CustomError.create(BAD_REQUEST);
      
      const data = req.body;
      if (!data || Object.keys(data).length === 0) {
          throw CustomError.create(BAD_REQUEST);
      }

      const message = "PRODUCT UPDATED";
      const response = await updateService(id, data);
      if (response) {
          return res.status(200).json({ message, data: response });
      }
      throw CustomError.create(NOT_FOUND);
  } catch (error) {
      next(error);
  }
}

async function destroyProduct(req, res, next) {
  try {
      const { id } = req.params;
      if (!id) throw CustomError.create(BAD_REQUEST);

      const message = "PRODUCT DELETED";
      const response = await destroyService(id);
      if (response) {
          return res.status(200).json({ message });
      }
      throw CustomError.create(NOT_FOUND);
  } catch (error) {
      next(error);
  }
}

export { createProduct, readProducts, updateProduct, destroyProduct };
