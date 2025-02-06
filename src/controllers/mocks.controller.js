import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "../utils/errors/dictionary.error.js";

import CustomError from "../utils/errors/custom.error.js";
import { MocksService } from "../services/mocks.service.js";
import  logger  from "../utils/logger.util.js";

const mocksService = new MocksService();

export const generateMockUsers = (req, res, next) => {
  try {
    const { count = 10 } = req.query;
    if (isNaN(count) || count <= 0) {
      throw CustomError.create(BAD_REQUEST);
    }
    const users = mocksService.generateUsers(Number(count));
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const generateAndSaveMocks = async (req, res, next) => {
  try {
    const { users, products } = req.params;
    if (isNaN(users) || isNaN(products) || users <= 0 || products <= 0) {
      throw CustomError.create(BAD_REQUEST);
    }
    
    const mockUsers = mocksService.generateUsers(Number(users));
    const mockProducts = mocksService.generateProducts(Number(products));

    await mocksService.saveUsers(mockUsers);
    await mocksService.saveProducts(mockProducts);

    logger.info(`Mock data inserted: ${usersNum} users, ${productsNum} products`);
    res.status(201).json({ message: "Mock data inserted successfully", users, products });
  } catch (error) {
    logger.error("Error inserting mock data:", error);  // Log the raw error for debugging
    next(CustomError.create(INTERNAL_SERVER_ERROR));
  }
};
