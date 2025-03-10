import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "../utils/errors/dictionary.error.js";

import CustomError from "../utils/errors/custom.error.js";
import { MocksService } from "../services/mocks.service.js";
import  logger  from "../utils/logger.util.js";

const mocksService = new MocksService();

export const generateMockUsers = (req, res, next) => {
  try {
    const count = parseInt(req.query.count) || 10; // Si no se pasa, por defecto es 10
    if (isNaN(count) || count <= 0) {
      throw CustomError.create(BAD_REQUEST, "Invalid count value. Must be a positive number.");
    }
    const users = mocksService.generateUsers(count);
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};


export const generateAndSaveMocks = async (req, res, next) => {
  try {
    const { users, products } = req.body; // Ahora se obtiene del body

    if (!users || !products || isNaN(users) || isNaN(products) || users <= 0 || products <= 0) {
      throw CustomError.create(BAD_REQUEST, "Invalid users/products count. Must be positive numbers.");
    }

    const mockUsers = mocksService.generateUsers(Number(users));
    const mockProducts = mocksService.generateProducts(Number(products));

    await mocksService.saveUsers(mockUsers);
    await mocksService.saveProducts(mockProducts);

    logger.info(`Mock data inserted: ${users} users, ${products} products`);
    res.status(201).json({ message: "Mock data inserted successfully", users, products });
  } catch (error) {
    logger.error("Error inserting mock data:", error);
    next(CustomError.create(INTERNAL_SERVER_ERROR));
  }
};

